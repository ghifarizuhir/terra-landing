import { chromium } from 'playwright'
import sharp from 'sharp'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = resolve(ROOT, 'public/screenshots')
const STATE = resolve(ROOT, '.capture/state.json')
const DEMO_SLUG = process.env.CAPTURE_DEMO_SLUG ?? 'terraline-demo'
const DEMO_NAME = 'Terraline Demo'

function loadLocalEnv() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

loadLocalEnv()

const BASE = process.env.CAPTURE_BASE_URL ?? 'https://dashboard.terraline.space'
const API = process.env.CAPTURE_API_URL ?? 'https://api.terraline.space'

async function login(page) {
  const email = process.env.CAPTURE_EMAIL
  const password = process.env.CAPTURE_PASSWORD
  if (!email || !password) throw new Error('Set CAPTURE_EMAIL and CAPTURE_PASSWORD in .env.local')
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  const emailInput = page.locator('input[type="email"]')
  try {
    await emailInput.waitFor({ timeout: 8000 })
  } catch {
    return // already signed in via storageState
  }
  await emailInput.fill(email)
  await page.locator('button[type="submit"]').first().click()
  const passwordInput = page.locator('input[type="password"]')
  await passwordInput.waitFor({ timeout: 8000 })
  await passwordInput.fill(password)
  await page.locator('button[type="submit"]').first().click()
  await page.waitForFunction(() => !document.querySelector('input[type="password"]'), null, { timeout: 20000 })
}

async function api(page, path, { method = 'GET', body } = {}) {
  const call = () =>
    page.evaluate(
      async ({ url, method, body }) => {
        const r = await fetch(url, {
          method,
          credentials: 'include',
          headers: body ? { 'Content-Type': 'application/json' } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        })
        const text = await r.text()
        let json = null
        try {
          json = JSON.parse(text)
        } catch {
          json = null
        }
        return { ok: r.ok, status: r.status, json }
      },
      { url: API + path, method, body },
    )
  let res = await call()
  if (res.status === 401) {
    await page
      .evaluate(async (url) => {
        await fetch(url, { method: 'POST', credentials: 'include' }).catch(() => {})
      }, API + '/api/auth/refresh/')
      .catch(() => {})
    res = await call()
  }
  return res
}

const rows = (res) => (res.json ? (Array.isArray(res.json) ? res.json : res.json.results ?? []) : [])

async function ensureDemo(page) {
  let workspaces = rows(await api(page, '/api/workspaces/'))
  let demo = workspaces.find((w) => w.slug === DEMO_SLUG)
  if (!demo) {
    console.log(`creating workspace ${DEMO_NAME} (${DEMO_SLUG})`)
    await api(page, '/api/workspaces/', {
      method: 'POST',
      body: { name: DEMO_NAME, slug: DEMO_SLUG, company_role: 'IT' },
    })
    workspaces = rows(await api(page, '/api/workspaces/'))
    demo = workspaces.find((w) => w.slug === DEMO_SLUG)
  }
  if (!demo) throw new Error('demo workspace unavailable')

  const projects = rows(await api(page, `/api/workspaces/${demo.slug}/projects/`))
  const project = projects.find((p) => p.name === DEMO_NAME) ?? projects[0]
  if (!project) throw new Error('demo project unavailable')

  const issues = rows(await api(page, `/api/workspaces/${demo.slug}/projects/${project.id}/issues/?per_page=5`))
  const issue = issues[0]
  const identifier = issue ? `${project.identifier}-${issue.sequence_id}` : null

  await api(page, `/api/workspaces/${demo.slug}/projects/${project.id}/`, {
    method: 'PATCH',
    body: { intake_view: true },
  })
  const intakeItems = rows(
    await api(page, `/api/workspaces/${demo.slug}/projects/${project.id}/intake-issues/`),
  )
  if (intakeItems.length === 0) {
    for (const name of ['VPN access for the audit vendor', 'Replacement laptop for the support desk']) {
      await api(page, `/api/workspaces/${demo.slug}/projects/${project.id}/intake-issues/`, {
        method: 'POST',
        body: { issue: { name, priority: 'high' } },
      })
    }
  }

  return { slug: demo.slug, projectId: project.id, identifier, issueName: issue?.name ?? null, workspaces }
}

async function ensureDemoServices(page, demo) {
  const url = `/api/workspaces/${demo.slug}/projects/${demo.projectId}/services/`
  let services = rows(await api(page, url))
  if (services.length > 0) return services

  console.log('seeding demo services')
  const seed = [
    { name: 'Payment Gateway', status: 'active', criticality: 'critical', type: 'internal', description: 'Handles all card payments.' },
    { name: 'Auth Service', status: 'active', criticality: 'critical', type: 'internal', description: 'Authentication and sessions.' },
    { name: 'Notification Service', status: 'maintenance', criticality: 'medium', type: 'internal', description: 'Email and push notifications.' },
    { name: 'Postgres Primary', status: 'active', criticality: 'critical', type: 'infrastructure', description: 'Primary relational database.' },
    { name: 'Email Provider', status: 'active', criticality: 'high', type: 'third_party', description: 'External SMTP provider.' },
    { name: 'Analytics Pipeline', status: 'planned', criticality: 'low', type: 'internal', description: 'Batch analytics ingestion.' },
  ]
  for (const s of seed) {
    await api(page, url, {
      method: 'POST',
      body: { ...s, description_html: `<p>${s.description}</p>` },
    })
  }
  services = rows(await api(page, url))
  const byName = Object.fromEntries(services.map((s) => [s.name, s.id]))
  const deps = [
    ['Payment Gateway', 'Auth Service'],
    ['Payment Gateway', 'Postgres Primary'],
    ['Auth Service', 'Postgres Primary'],
    ['Notification Service', 'Email Provider'],
    ['Analytics Pipeline', 'Postgres Primary'],
  ]
  for (const [from, to] of deps) {
    if (byName[from] && byName[to]) {
      await api(page, `/api/workspaces/${demo.slug}/projects/${demo.projectId}/service-dependencies/`, {
        method: 'POST',
        body: { from_service_id: byName[from], to_service_id: byName[to] },
      })
    }
  }
  return rows(await api(page, url))
}

async function settle(page, ms = 900) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(ms)
}

async function shoot(page, file) {
  const buffer = await page.screenshot({ type: 'png' })
  await sharp(buffer).webp({ quality: 82 }).toFile(resolve(OUT, `${file}.webp`))
  console.log(`captured ${file}.webp`)
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  mkdirSync(resolve(ROOT, '.capture'), { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    storageState: existsSync(STATE) ? STATE : undefined,
  })
  const page = await context.newPage()
  await login(page)
  await context.storageState({ path: STATE })

  const demo = await ensureDemo(page)
  const demoServices = await ensureDemoServices(page, demo)
  const detailService = demoServices.find((s) => s.name === 'Payment Gateway') ?? demoServices[0] ?? null
  const svc = { slug: demo.slug, projectId: demo.projectId, serviceId: detailService?.id ?? null }
  const schedulerSlug = demo.slug

  const goto = async (url, action, ms) => {
    await page.goto(BASE + url, { waitUntil: 'domcontentloaded' }).catch(() => {})
    await settle(page, ms)
    if (action) await action(page)
  }

  await goto(`/${demo.slug}/projects/${demo.projectId}/issues/`, async (p) => {
    const list = p.getByRole('button', { name: /list layout/i }).first()
    try {
      await list.waitFor({ timeout: 15000 })
      await list.click()
    } catch {
      console.warn('list layout button not found')
    }
    await settle(p, 1500)
  })
  await shoot(page, 'work-items-list')

  await goto(`/${demo.slug}/projects/${demo.projectId}/issues/`, async (p) => {
    const board = p.getByRole('button', { name: /board layout/i }).first()
    try {
      await board.waitFor({ timeout: 15000 })
      await board.click()
    } catch {
      console.warn('board layout button not found')
    }
    await settle(p, 1500)
  })
  await shoot(page, 'work-items-board')

  if (demo.identifier) {
    await goto(`/${demo.slug}/browse/${demo.identifier}`)
    await shoot(page, 'work-item-detail')

    await goto(`/${demo.slug}/browse/${demo.identifier}`, async (p) => {
      const toggle = p.locator('[aria-label="AI Assistant"]').first()
      if (await toggle.count()) await toggle.click().catch(() => {})
      await settle(p, 1500)
    })
    await shoot(page, 'galileo')
  }

  await goto(`/${demo.slug}/settings/work-item-types`)
  await shoot(page, 'work-item-types')

  await goto(`/${demo.slug}/settings/workflows`, async (p) => {
    const row = p.getByRole('link', { name: /Incident Workflow/i }).first()
    if (await row.count()) {
      await row.click().catch(() => {})
      await settle(p, 1200)
    }
  })
  await shoot(page, 'workflow-editor')

  await goto(`/${svc.slug}/projects/${svc.projectId}/services/`)
  await shoot(page, 'services-board')

  await goto(`/${svc.slug}/projects/${svc.projectId}/services/`, async (p) => {
    const graph = p.locator('div.bg-layer-3.rounded-sm button').nth(1)
    try {
      await graph.waitFor({ timeout: 15000 })
      await graph.click()
    } catch {
      console.warn('services graph toggle not found')
    }
    await settle(p, 1500)
  })
  await shoot(page, 'services-graph')

  if (svc.serviceId) {
    await goto(`/${svc.slug}/projects/${svc.projectId}/services/${svc.serviceId}`)
    await shoot(page, 'service-detail')
  }

  await goto(`/${demo.slug}/projects/${demo.projectId}/intake/`, null, 1200)
  await shoot(page, 'intake')

  await goto(`/${demo.slug}/projects/${demo.projectId}/pages/`, null, 1500)
  await shoot(page, 'pages')

  await goto(`/${demo.slug}/projects/${demo.projectId}/cycles/`)
  await shoot(page, 'cycles')

  await goto(`/${schedulerSlug}/scheduler/`, null, 1200)
  await shoot(page, 'scheduler')

  if (demo.identifier) {
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      storageState: STATE,
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto(BASE + `/${demo.slug}/browse/${demo.identifier}`, { waitUntil: 'domcontentloaded' }).catch(() => {})
    if (demo.issueName) {
      await mobilePage.getByText(demo.issueName, { exact: false }).first().waitFor({ timeout: 20000 }).catch(() => {})
    }
    await mobilePage.keyboard.press('Escape').catch(() => {})
    await mobilePage.mouse.click(360, 520).catch(() => {})
    await mobilePage.waitForTimeout(1200)
    await shoot(mobilePage, 'mobile-work-item')
    await mobileContext.close()
  }

  const ogTemplate = resolve(ROOT, 'public/og-template.html')
  if (existsSync(ogTemplate)) {
    const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
    await ogPage.goto('file://' + ogTemplate)
    await ogPage.waitForTimeout(400)
    await ogPage.screenshot({ path: resolve(ROOT, 'public/og-image.png') })
    console.log('captured og-image.png')
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

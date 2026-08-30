import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { managements } from '../.generated-managements.mjs'

const OUT = new URL('../docs/skills', import.meta.url).pathname

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/→/g, 'to')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const folderByMgmt = {
  incident: 'incident-management',
  request: 'service-request-management',
  problem: 'problem-management',
  change: 'change-management',
  knowledge: 'knowledge-management',
  improvement: 'continual-improvement',
  asset: 'asset-management',
  'service-map': 'service-configuration',
}

const codeBlock = (code) => '```js\n' + code + '\n```'

const skillDoc = (skill, mgmt) => {
  const parts = []
  parts.push('---')
  parts.push(`name: ${skill.name}`)
  if (skill.stage) parts.push(`stage: "${skill.stage}"`)
  parts.push(`management: ${mgmt.title} (${mgmt.prefix})`)
  if (skill.description) parts.push(`description: ${skill.description.replace(/\n/g, ' ')}`)
  parts.push('---')
  parts.push('')
  parts.push(`# ${skill.name}`)
  parts.push('')
  if (skill.stage) {
    const laneWord = mgmt.lane === 'foundation' ? 'Workflow' : 'Cycle'
    parts.push(`> **${skill.stage}** · ${laneWord} stage of ${mgmt.title} (${mgmt.prefix})`)
    parts.push('')
  }
  if (skill.description) {
    parts.push(`**Use when** ${skill.description.replace(/^Use when /i, '')}`)
    parts.push('')
  }
  parts.push('## Overview')
  parts.push('')
  parts.push(skill.overview)
  parts.push('')
  parts.push('## When to Use')
  parts.push('')
  for (const w of Array.isArray(skill.whenToUse) ? skill.whenToUse : [skill.whenToUse]) {
    parts.push(`- ${w}`)
  }
  parts.push('')
  if (skill.corePattern) {
    parts.push('## Core Pattern')
    parts.push('')
    parts.push('### Before')
    parts.push('')
    parts.push(codeBlock(skill.corePattern.before))
    parts.push('')
    parts.push('### After')
    parts.push('')
    parts.push(codeBlock(skill.corePattern.after))
    parts.push('')
  }
  if (skill.quickReference) {
    parts.push('## Quick Reference')
    parts.push('')
    parts.push('| ' + skill.quickReference.headers.join(' | ') + ' |')
    parts.push('| ' + skill.quickReference.headers.map(() => '---').join(' | ') + ' |')
    for (const row of skill.quickReference.rows) {
      parts.push('| ' + row.join(' | ') + ' |')
    }
    parts.push('')
  }
  parts.push('## Implementation')
  parts.push('')
  parts.push(skill.how)
  parts.push('')
  if (skill.commonMistakes?.length) {
    parts.push('## Common Mistakes')
    parts.push('')
    for (const m of skill.commonMistakes) parts.push(`- ${m}`)
    parts.push('')
  }
  if (skill.example) {
    parts.push('## Example')
    parts.push('')
    parts.push(skill.example)
    parts.push('')
  }
  return parts.join('\n')
}

const mgmtIndex = (mgmt, files) => {
  const laneWord = mgmt.lane === 'foundation' ? 'workflow' : 'cycle'
  const stages = [...mgmt.skills]
    .map((s) => s.stage)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
  const parts = []
  parts.push(`# ${mgmt.title} (${mgmt.prefix})`)
  parts.push('')
  parts.push(mgmt.oneLiner)
  parts.push('')
  parts.push(`Lane: **${mgmt.lane}**${stages.length ? ` · ${laneWord} coverage: ${mgmt.skills.length}/${mgmt.skills.length} stages` : ''}`)
  parts.push('')
  parts.push('## What it does')
  parts.push('')
  for (const b of mgmt.bullets) parts.push(`- ${b}`)
  parts.push('')
  parts.push('## AI skills')
  parts.push('')
  parts.push('| # | Stage | Skill | File |')
  parts.push('| --- | --- | --- | --- |')
  ;[...mgmt.skills]
    .sort((a, b) => (a.stage ?? '').localeCompare(b.stage ?? ''))
    .forEach((s, i) => {
      const file = `./${slug(s.name)}.md`
      parts.push(`| ${String(i + 1).padStart(2, '0')} | ${s.stage ?? ''} | ${s.name} | ${file} |`)
    })
  parts.push('')
  return parts.join('\n')
}

const rootIndex = (entries) => {
  const totalSkills = entries.reduce((n, [, m]) => n + m.skills.length, 0)
  const parts = []
  parts.push('# Terra AI for ITSM · Skill Library')
  parts.push('')
  parts.push(`${entries.length} management workflows · ${totalSkills} AI skills · one skill per lifecycle/workflow stage.`)
  parts.push('')
  parts.push('Generated from `src/data/managements.ts` run `npm run docs:skills` to regenerate.')
  parts.push('')
  parts.push('| Management | Prefix | Lane | Skills | Folder |')
  parts.push('| --- | --- | --- | --- | --- |')
  for (const [folder, mgmt] of entries) {
    parts.push(`| ${mgmt.title} | ${mgmt.prefix} | ${mgmt.lane} | ${mgmt.skills.length} | ./${folder}/ |`)
  }
  parts.push('')
  return parts.join('\n')
}

await mkdir(OUT, { recursive: true })
const entries = []
for (const mgmt of [...managements].sort((a, b) => a.order - b.order)) {
  const folder = folderByMgmt[mgmt.id] ?? slug(mgmt.title)
  entries.push([folder, mgmt])
  const dir = join(OUT, folder)
  await mkdir(dir, { recursive: true })
  for (const skill of mgmt.skills) {
    await writeFile(join(dir, `${slug(skill.name)}.md`), skillDoc(skill, mgmt), 'utf8')
  }
  await writeFile(join(dir, 'README.md'), mgmtIndex(mgmt), 'utf8')
}
await writeFile(join(OUT, 'README.md'), rootIndex(entries), 'utf8')
console.log(`Generated docs/skills ${entries.length} folders, ${entries.reduce((n, [, m]) => n + m.skills.length, 0)} skill docs`)

import { product, type Feature, type Screenshot } from './product'

export type Focus = {
  readonly x: number
  readonly y: number
  readonly scale: number
  readonly maxScale?: number
}

export type Hotspot = {
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
  readonly label: string
  readonly side?: 'top' | 'bottom'
  readonly labelAlign?: 'left' | 'right'
}

export type ShotDirection = {
  readonly focus: Focus
  readonly hotspots?: readonly Hotspot[]
  readonly fit?: 'cover' | 'contain'
  readonly align?: 'center' | 'right'
}

const dir: Record<string, ShotDirection> = {
  'work-items-board': { fit: 'cover', focus: { x: 0.52, y: 0.42, scale: 1.06 } },
  'work-items-list': {
    focus: { x: 0.5, y: 0.34, scale: 1.32 },
    hotspots: [{ x: 0.18, y: 0.085, w: 0.46, h: 0.27, label: 'Every state, one queue' }],
  },
  'work-item-detail': {
    focus: { x: 0.44, y: 0.46, scale: 1.2 },
    hotspots: [
      { x: 0.2, y: 0.15, w: 0.42, h: 0.17, label: 'Description with versions' },
      { x: 0.2, y: 0.6, w: 0.46, h: 0.18, label: 'Activity & comments' },
    ],
  },
  'work-item-types': {
    focus: { x: 0.44, y: 0.36, scale: 1.3 },
    hotspots: [{ x: 0.275, y: 0.22, w: 0.33, h: 0.275, label: 'Incident, request, change' }],
  },
  'workflow-editor': {
    focus: { x: 0.6, y: 0.32, scale: 1.2 },
    hotspots: [
      { x: 0.3, y: 0.17, w: 0.33, h: 0.29, label: 'Typed states' },
      { x: 0.72, y: 0.17, w: 0.23, h: 0.25, label: 'Allowed transitions', labelAlign: 'right', side: 'top' },
    ],
  },
  'services-board': {
    focus: { x: 0.44, y: 0.32, scale: 1.24 },
    hotspots: [
      { x: 0.175, y: 0.088, w: 0.21, h: 0.037, label: '1 down · 2 degraded · 6 healthy' },
      { x: 0.665, y: 0.185, w: 0.05, h: 0.3, label: 'Health' },
    ],
  },
  'services-graph': {
    focus: { x: 0.62, y: 0.34, scale: 1.2 },
    hotspots: [
      { x: 0.4, y: 0.25, w: 0.3, h: 0.22, label: 'Dependency graph', side: 'top' },
      { x: 0.8, y: 0.39, w: 0.09, h: 0.08, label: 'Criticality', labelAlign: 'right' },
    ],
  },
  'service-detail': {
    focus: { x: 0.55, y: 0.28, scale: 1.16 },
    hotspots: [
      { x: 0.735, y: 0.15, w: 0.225, h: 0.185, label: 'Health & owner', side: 'top', labelAlign: 'right' },
      { x: 0.2, y: 0.27, w: 0.5, h: 0.15, label: 'Linked work items' },
    ],
  },
  intake: {
    focus: { x: 0.52, y: 0.2, scale: 1.18 },
    hotspots: [
      { x: 0.18, y: 0.13, w: 0.26, h: 0.17, label: 'Triage queue' },
      { x: 0.815, y: 0.055, w: 0.15, h: 0.035, label: 'Accept, decline, snooze', labelAlign: 'right' },
    ],
  },
  galileo: {
    focus: { x: 0.8, y: 0.28, scale: 1.2 },
    hotspots: [
      { x: 0.72, y: 0.075, w: 0.23, h: 0.035, label: 'Grounded in the record', labelAlign: 'right' },
      { x: 0.76, y: 0.25, w: 0.2, h: 0.14, label: 'Draft prompts', labelAlign: 'right' },
    ],
  },
  scheduler: {
    focus: { x: 0.44, y: 0.4, scale: 1.2 },
    hotspots: [
      { x: 0.33, y: 0.145, w: 0.13, h: 0.08, label: 'Structured recipe' },
      { x: 0.33, y: 0.605, w: 0.23, h: 0.055, label: 'Success runs' },
    ],
  },
  pages: {
    focus: { x: 0.28, y: 0.16, scale: 1.22 },
    hotspots: [
      { x: 0.195, y: 0.1, w: 0.08, h: 0.035, label: 'Public & archived', side: 'top' },
      { x: 0.195, y: 0.15, w: 0.105, h: 0.045, label: 'Runbooks & SOPs' },
    ],
  },
  cycles: {
    focus: { x: 0.34, y: 0.45, scale: 1.2 },
    hotspots: [
      { x: 0.205, y: 0.235, w: 0.235, h: 0.055, label: 'Progress per cycle' },
      { x: 0.215, y: 0.635, w: 0.105, h: 0.035, label: 'Upcoming work' },
    ],
  },
  'mobile-work-item': {
    fit: 'contain',
    align: 'right',
    focus: { x: 0.5, y: 0.5, scale: 1.05, maxScale: 1.05 },
    hotspots: [
      { x: 0.08, y: 0.16, w: 0.55, h: 0.16, label: 'Read & update' },
      { x: 0.08, y: 0.755, w: 0.5, h: 0.13, label: 'Comments & attachments', labelAlign: 'right' },
    ],
  },
}

const shotName = (src: string) => src.split('/').pop()?.replace('.webp', '') ?? src

export type Beat = {
  readonly id: string
  readonly shot: Screenshot
  readonly direction: ShotDirection
}

type BaseChapter = {
  readonly id: string
  readonly number: string
  readonly eyebrow: string
  readonly title: string
  readonly body: string
}

export type CoverChapter = BaseChapter & {
  readonly kind: 'cover'
  readonly primaryCta: { readonly label: string; readonly href: string }
  readonly beats: readonly Beat[]
}

export type FeatureChapter = BaseChapter & {
  readonly kind: 'feature'
  readonly feature: Feature
  readonly bullets: readonly string[]
  readonly beats: readonly Beat[]
}

export type WhyChapter = BaseChapter & { readonly kind: 'why'; readonly beats: readonly Beat[] }
export type NextChapter = BaseChapter & { readonly kind: 'next'; readonly beats: readonly Beat[] }

export type Chapter = CoverChapter | FeatureChapter | WhyChapter | NextChapter

const byId = (id: string): Feature => {
  const feature = product.features.find((f) => f.id === id)
  if (!feature) throw new Error(`unknown feature: ${id}`)
  return feature
}

const beatsFor = (feature: Feature): readonly Beat[] =>
  feature.screenshots.map((shot) => ({
    id: `${feature.id}:${shotName(shot.src)}`,
    shot,
    direction: dir[shotName(shot.src)] ?? { focus: { x: 0.5, y: 0.45, scale: 1.1 } },
  }))

const featureIds = [
  'work-items',
  'types',
  'services',
  'intake',
  'ai',
  'scheduler',
  'pages',
  'delivery',
  'mobile',
] as const

export const chapters: readonly Chapter[] = [
  {
    kind: 'cover',
    id: 'cover',
    number: '00',
    eyebrow: product.hero.eyebrow,
    title: product.hero.title,
    body: product.hero.body,
    primaryCta: product.hero.primaryCta,
    beats: [
      {
        id: 'cover:work-items-board',
        shot: product.hero.screenshot,
        direction: dir['work-items-board'],
      },
    ],
  },
  ...featureIds.map((id, i) => {
    const feature = byId(id)
    return {
      kind: 'feature' as const,
      id,
      number: String(i + 1).padStart(2, '0'),
      eyebrow: feature.eyebrow,
      title: feature.title,
      body: feature.body,
      bullets: feature.bullets,
      feature,
      beats: beatsFor(feature),
    }
  }),
  {
    kind: 'why',
    id: 'why',
    number: '10',
    eyebrow: 'Why Terraline',
    title: 'A service layer on a proven delivery core',
    body: product.architecture.body,
    beats: [],
  },
  {
    kind: 'next',
    id: 'next',
    number: '11',
    eyebrow: 'Roadmap',
    title: 'Shipped today, next in line',
    body: 'No dates, no promises — what exists in the product today and what is being built next.',
    beats: [],
  },
]

export const totalChapters = chapters.length

export const chapterAt = (index: number): Chapter =>
  chapters[Math.min(Math.max(index, 0), chapters.length - 1)]

export const coverStartIndex = 0

export const lastChapterIndex = chapters.length - 1

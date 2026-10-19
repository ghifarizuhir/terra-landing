import type { ShowcaseChapterId } from '../../data/product-demo'
import DeliveryScene from './scenes/DeliveryScene'
import GalileoScene from './scenes/GalileoScene'
import ServicesScene from './scenes/ServicesScene'
import WorkItemsScene from './scenes/WorkItemsScene'

type Props = { chapter: ShowcaseChapterId; step: number; reducedMotion: boolean }

export default function SceneView({ chapter, step, reducedMotion }: Props) {
  switch (chapter) {
    case 'work':
      return <WorkItemsScene step={step} reducedMotion={reducedMotion} />
    case 'services':
      return <ServicesScene step={step} reducedMotion={reducedMotion} />
    case 'galileo':
      return <GalileoScene step={step} reducedMotion={reducedMotion} />
    case 'delivery':
      return <DeliveryScene step={step} reducedMotion={reducedMotion} />
  }
}

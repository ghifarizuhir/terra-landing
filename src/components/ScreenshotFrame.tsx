import type { Screenshot } from '../data/product'

type Props = Screenshot & { priority?: boolean; className?: string }

export default function ScreenshotFrame({ src, alt, width, height, priority = false, className = '' }: Props) {
  return (
    <figure className={`overflow-hidden rounded-lg border border-border bg-subtle shadow-sm ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-white px-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  )
}

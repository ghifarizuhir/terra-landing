type Props = { className?: string }

export default function Mark({ className = 'h-4 w-auto' }: Props) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="20" height="4" rx="2" fill="currentColor" />
      <rect x="3" y="5" width="14" height="4" rx="2" fill="currentColor" opacity="0.72" />
      <rect x="6" y="10" width="8" height="4" rx="2" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

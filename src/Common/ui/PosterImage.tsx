import { posterUrl } from '../core/imageUtils'

interface Props {
  path: string | null
  alt: string
  className?: string
}

export function PosterImage({ path, alt, className = '' }: Props) {
  const src = posterUrl(path)

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-bg-card)] text-[var(--color-text-muted)] ${className}`}
        aria-label={alt}
      >
        <span className="text-xs">No image</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  )
}
import { Link } from 'react-router-dom'
import { PosterImage } from '@/Common'
import type { MediaItem } from '@/Common'

interface Props {
  movie: MediaItem
}

export function MovieCard({ movie }: Props) {
  const href = movie.mediaType === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`

  return (
    <article className="group w-40 shrink-0">
      <Link to={href} className="block">
        <div className="relative overflow-hidden rounded-xl">
          <PosterImage
            path={movie.posterPath}
            alt={movie.title}
            className="aspect-[2/3] w-full transition-transform duration-300 group-hover:scale-105"
          />

          {/* Rating badge */}
          <span className="absolute right-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-[var(--color-rating)]">
            {movie.voteAverage.toFixed(1)}
          </span>

          {/* Watchlist placeholder — wired in M5 */}
          <button
            type="button"
            aria-label="Add to watchlist"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            +
          </button>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-medium text-[var(--color-text-primary)]">
          {movie.title}
        </h3>

        {movie.releaseDate && (
          <p className="text-xs text-[var(--color-text-muted)]">
            {movie.releaseDate.slice(0, 4)}
          </p>
        )}
      </Link>
    </article>
  )
}
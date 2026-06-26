import { Link } from 'react-router-dom'
import { backdropUrl } from '@/Common'
import type { MediaItem } from '@/Common'

interface Props {
  movie: MediaItem
  onPlayTrailer?: () => void
}

export function HeroBanner({ movie, onPlayTrailer }: Props) {
  const backdrop = backdropUrl(movie.backdropPath, 'w1280')

  return (
    <section className="relative mb-10 h-[420px] w-full overflow-hidden">
      {backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-bg-card)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />

      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-end px-6 pb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-light)]">
          Trending Today
        </p>

        <h1 className="mb-3 max-w-2xl text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
          {movie.title}
        </h1>

        <div className="mb-6 flex items-center gap-4">
          <span className="rounded-md bg-[var(--color-brand)] px-2 py-1 text-sm font-bold text-white">
            {movie.voteAverage.toFixed(1)}
          </span>
          {movie.releaseDate && (
            <span className="text-[var(--color-text-secondary)]">
              {movie.releaseDate.slice(0, 4)}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            to={`/movie/${movie.id}`}
            className="rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-light)] transition-colors"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={onPlayTrailer}
            className="rounded-full border border-[var(--color-border)] bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            ▶ Trailer
          </button>
        </div>
      </div>
    </section>
  )
}
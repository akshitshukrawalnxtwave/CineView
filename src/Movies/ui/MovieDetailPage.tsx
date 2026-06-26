import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AsyncSection, ErrorBoundary, backdropUrl, PosterImage } from '@/Common'
import { ContentRow } from './ContentRow'
import { CastCarousel } from './CastCarousel'
import { TrailerModal } from './TrailerModal'
import { useMovieDetail } from './useMovieDetail'
import { preferencesStore } from '@/Preferences'
import { useTranslation } from 'react-i18next'
import { movieDetailToMediaItem } from '../core/types'
import { WatchlistToggle } from '@/Collection'
function RowSection({
  title,
  row,
}: {
  title: string
  row: { items: import('@/Common').MediaItem[]; isLoading: boolean; error: string | null }
}) {
  return (
    <ErrorBoundary>
      <AsyncSection
        isLoading={row.isLoading}
        error={row.error}
        isEmpty={row.items.length === 0}
        emptyMessage={`No ${title.toLowerCase()} found.`}
      >
        <ContentRow title={title} items={row.items} />
      </AsyncSection>
    </ErrorBoundary>
  )
}

export function MovieDetailPage() {
  const {
    movie,
    cast,
    trailerKey,
    similar,
    recommended,
    isLoading,
    error,
    notFound,
    refetch,
  } = useMovieDetail(preferencesStore.language, preferencesStore.region)

  const [trailerOpen, setTrailerOpen] = useState(false)
  const { t } = useTranslation('movies')
  if (notFound) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold text-[var(--color-brand-light)]">404</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">Movie not found.</p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-10">
      <AsyncSection isLoading={isLoading} error={error} onRetry={refetch}>
        {movie && (
          <>
            {/* Hero */}
            <section className="relative mb-10 h-[480px] w-full overflow-hidden">
              {backdropUrl(movie.backdrop_path) ? (
                <img
                  src={backdropUrl(movie.backdrop_path)!}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-bg-card)]" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-transparent" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-8 px-6 pb-10">
                <PosterImage
                  path={movie.poster_path}
                  alt={movie.title}
                  className="hidden h-72 w-48 shrink-0 rounded-xl md:block"
                />

                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <p className="mt-2 italic text-[var(--color-text-secondary)]">
                      {movie.tagline}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="rounded-md bg-[var(--color-brand)] px-2 py-1 font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                    {movie.runtime != null && <span>{movie.runtime} {t('minutes')}</span>}
                    <span>{movie.genres.map((g) => g.name).join(' · ')}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {trailerKey && (
                      <button
                        type="button"
                        onClick={() => setTrailerOpen(true)}
                        className="rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-light)] transition-colors"
                      >
                        {t('hero.playTrailer')}
                      </button>
                    )}
                    <WatchlistToggle item={movieDetailToMediaItem(movie)} variant="button" />
                  </div>
                </div>
              </div>
            </section>

            {/* Overview */}
            <ErrorBoundary>
              <section className="mb-10 px-6">
                <h2 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{t('overview')}</h2>
                <p className="max-w-4xl leading-relaxed text-[var(--color-text-secondary)]">
                  {movie.overview || t('noOverviewAvailable')}
                </p>
              </section>
            </ErrorBoundary>

            {/* Cast */}
            <ErrorBoundary>
              <CastCarousel cast={cast} />
            </ErrorBoundary>

            {/* Similar + Recommended */}
            <RowSection title={t('similar')} row={similar} />
            <RowSection title={t('recommended')} row={recommended} />

            <TrailerModal
              isOpen={trailerOpen}
              youtubeKey={trailerKey}
              title={movie.title}
              onClose={() => setTrailerOpen(false)}
            />
          </>
        )}
      </AsyncSection>
    </div>
  )
}
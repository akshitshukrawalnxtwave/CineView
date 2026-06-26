import { useState } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { AsyncSection, ErrorBoundary, backdropUrl, PosterImage } from '@/Common'
import { CastCarousel } from '@/Movies/ui/CastCarousel'
import { TrailerModal } from '@/Movies/ui/TrailerModal'
import { useTVShowDetail } from './useTVShowDetail'
import { useTranslation } from 'react-i18next'
import { preferencesStore } from '@/Preferences'
import { WatchlistToggle } from '@/Collection'
import { tvShowToMediaItem } from '../core/types'

export function TVShowDetailPage() {
  const { id } = useParams()
  const { show, cast, trailerKey, isLoading, error, notFound, refetch } = useTVShowDetail(preferencesStore.tmdbLanguage, preferencesStore.tmdbRegion)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const { t } = useTranslation('tv')
  if (notFound) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold text-[var(--color-brand-light)]">404</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">{t('notFound')}</p>
        <Link to="/" className="mt-6 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white">
          {t('backToHome')}
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-10">
      <AsyncSection isLoading={isLoading} error={error} onRetry={refetch}>
        {show && (
          <>
            {/* Hero */}
            <section className="relative mb-8 h-[420px] w-full overflow-hidden">
              {backdropUrl(show.backdrop_path) ? (
                <img
                  src={backdropUrl(show.backdrop_path)!}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-bg-card)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-transparent" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end gap-8 px-6 pb-10">
                <PosterImage
                  path={show.poster_path}
                  alt={show.name}
                  className="hidden h-64 w-44 shrink-0 rounded-xl md:block"
                />
                <div>
                  <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">{show.name}</h1>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="rounded-md bg-[var(--color-brand)] px-2 py-1 font-bold text-white">
                      {show.vote_average.toFixed(1)}
                    </span>
                    {show.first_air_date && <span>{show.first_air_date.slice(0, 4)}</span>}
                    <span>{t('seasonCount_other', { count: show.number_of_seasons })}</span>
                    <span>{show.genres.map((g) => g.name).join(' · ')}</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    {trailerKey && (
                      <button
                        type="button"
                        onClick={() => setTrailerOpen(true)}
                        className="rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white"
                      >
                        {t('hero.playTrailer')}
                      </button>
                    )}
                    <WatchlistToggle item={tvShowToMediaItem(show)} variant="button" />
                  </div>
                </div>
              </div>
            </section>

            {/* Overview */}
            <section className="mb-8 px-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{t('details.overview')}</h2>
              <p className="max-w-4xl text-[var(--color-text-secondary)]">
                {show.overview || t('details.noOverviewAvailable')}
              </p>
            </section>

            {/* Seasons */}
            <section className="mb-8 px-6">
              <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">{t('details.seasons')}</h2>
              <div className="flex flex-wrap gap-2">
                {show.seasons
                  .filter((s) => s.season_number > 0)
                  .map((s) => (
                    <NavLink
                      key={s.season_number}
                      to={`/tv/${id}/season/${s.season_number}`}
                      className={({ isActive }) =>
                        `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[var(--color-brand)] text-white'
                            : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`
                      }
                    >
                      {s.name} ({t('seasonCount_one', { count: s.episode_count })})
                    </NavLink>
                  ))}
              </div>
            </section>

            {/* Nested season outlet */}
            <Outlet />

            {/* Cast */}
            <ErrorBoundary>
              <CastCarousel cast={cast} />
            </ErrorBoundary>

            <TrailerModal
              isOpen={trailerOpen}
              youtubeKey={trailerKey}
              title={show.name}
              onClose={() => setTrailerOpen(false)}
            />
          </>
        )}
      </AsyncSection>
    </div>
  )
}
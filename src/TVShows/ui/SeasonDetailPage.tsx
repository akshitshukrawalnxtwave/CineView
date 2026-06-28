import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { AsyncSection, ErrorBoundary } from '@/Common'
import { collectionStore } from '@/Collection'
import { EpisodeList } from './EpisodeList'
import { useSeasonDetail } from './useSeasonDetail'
import { useTranslation } from 'react-i18next'

export const SeasonDetailPage = observer(function SeasonDetailPage() {
  const { id, seasonNumber } = useParams()
  const tvId = Number(id)
  const seasonNum = Number(seasonNumber)
  const { seasonData, episodes, isLoading, error, notFound, refetch } = useSeasonDetail()
  const { t } = useTranslation('tv')

  const progress = collectionStore.getSeasonProgress(tvId, seasonNum, episodes.length)

  function handleMarkAll() {
    collectionStore.markSeasonWatched(
      tvId,
      seasonNum,
      episodes.map((e) => e.episode_number)
    )
  }

  function handleUnmarkAll() {
    collectionStore.unmarkSeason(
      tvId,
      seasonNum,
      episodes.map((e) => e.episode_number)
    )
  }

  if (notFound) {
    return (
      <p className="px-6 py-8 text-center text-[var(--color-text-muted)]">
        {t('notFound')}
      </p>
    )
  }

  return (
    <section className="mb-10">
      <ErrorBoundary>
        <AsyncSection
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          isEmpty={episodes.length === 0}
          emptyMessage={t('states.noEpisodes')}
        >
          {seasonData && (
            <>
              <div className="mb-4 px-6">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {seasonData.name}
                </h2>

                {episodes.length > 0 && (
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                      <span>
                        {t('progress.season', {
                          watched: progress.watched,
                          total: progress.total,
                        })}
                      </span>
                      <span>{progress.percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-brand)] transition-all"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>

                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={handleMarkAll}
                        className="text-sm text-[var(--color-brand-light)] hover:underline"
                      >
                        {t('progress.markAll')}
                      </button>
                      <button
                        type="button"
                        onClick={handleUnmarkAll}
                        className="text-sm text-[var(--color-text-muted)] hover:underline"
                      >
                        {t('progress.unmarkAll')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <EpisodeList tvId={tvId} seasonNumber={seasonNum} episodes={episodes} />
            </>
          )}
        </AsyncSection>
      </ErrorBoundary>
    </section>
  )
})

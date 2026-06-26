import { AsyncSection, ErrorBoundary } from '@/Common'
import { EpisodeList } from './EpisodeList'
import { useSeasonDetail } from './useSeasonDetail'
import { useTranslation } from 'react-i18next'

export function SeasonDetailPage() {
  const { seasonData, episodes, isLoading, error, notFound, refetch } = useSeasonDetail()

  const { t } = useTranslation('tv')

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
              <h2 className="mb-4 px-6 text-xl font-bold text-[var(--color-text-primary)]">
                {t('seasonCount_one', { count: seasonData.season_number })}
              </h2>
              <EpisodeList episodes={episodes} />
            </>
          )}
        </AsyncSection>
      </ErrorBoundary>
    </section>
  )
}
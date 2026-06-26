import { AsyncSection, ErrorBoundary } from '@/Common'
import { EpisodeList } from './EpisodeList'
import { useSeasonDetail } from './useSeasonDetail'

export function SeasonDetailPage() {
  const { seasonData, episodes, isLoading, error, notFound, refetch } = useSeasonDetail()

  if (notFound) {
    return (
      <p className="px-6 py-8 text-center text-[var(--color-text-muted)]">
        Season not found.
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
          emptyMessage="No episodes in this season."
        >
          {seasonData && (
            <>
              <h2 className="mb-4 px-6 text-xl font-bold text-[var(--color-text-primary)]">
                {seasonData.name}
              </h2>
              <EpisodeList episodes={episodes} />
            </>
          )}
        </AsyncSection>
      </ErrorBoundary>
    </section>
  )
}
import { AsyncSection, ErrorBoundary } from '@/Common'
import { ContentRow } from './ContentRow'
import { HeroBanner } from './HeroBanner'
import { GenreFilter } from './GenreFilter'
import { useHomePage } from './useHomePage'
import { preferencesStore } from '@/Preferences'
import { useTranslation } from 'react-i18next'

function RowSection({
  title,
  row,
  onRetry,
}: {
  title: string
  row: { items: import('@/Common').MediaItem[]; isLoading: boolean; error: string | null }
  onRetry: () => void
}) {
  const { t } = useTranslation('movies')
  return (
    <ErrorBoundary>
      <AsyncSection
        isLoading={row.isLoading}
        error={row.error}
        isEmpty={row.items.length === 0}
        onRetry={onRetry}
      >
        <ContentRow title={t(title)} items={row.items} />
      </AsyncSection>
    </ErrorBoundary>
  )
}

export function HomePage() {
  const {
    heroMovie,
    genres,
    activeGenreId,
    setActiveGenreId,
    trending,
    popular,
    topRated,
    upcoming,
    refetchAll,
  } = useHomePage(preferencesStore.language, preferencesStore.region)
  const { t } = useTranslation('movies')

  return (
    <div className="py-4">
      {heroMovie && !activeGenreId && (
        <ErrorBoundary>
          <HeroBanner movie={heroMovie} />
        </ErrorBoundary>
      )}

      <GenreFilter
        genres={genres}
        activeGenreId={activeGenreId}
        onSelect={setActiveGenreId}
      />

      <RowSection title={t('rows.trending')} row={trending} onRetry={refetchAll} />
      <RowSection title={t('rows.popular')} row={popular} onRetry={refetchAll} />
      <RowSection title={t('rows.topRated')} row={topRated} onRetry={refetchAll} />
      <RowSection title={t('rows.upcoming')} row={upcoming} onRetry={refetchAll} />
    </div>
  )
}
import { AsyncSection, ErrorBoundary } from '@/Common'
import { ContentRow } from './ContentRow'
import { HeroBanner } from './HeroBanner'
import { GenreFilter } from './GenreFilter'
import { useHomePage } from './useHomePage'

function RowSection({
  title,
  row,
  onRetry,
}: {
  title: string
  row: { items: import('@/Common').MediaItem[]; isLoading: boolean; error: string | null }
  onRetry: () => void
}) {
  return (
    <ErrorBoundary>
      <AsyncSection
        isLoading={row.isLoading}
        error={row.error}
        isEmpty={row.items.length === 0}
        onRetry={onRetry}
      >
        <ContentRow title={title} items={row.items} />
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
  } = useHomePage()

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

      <RowSection title="Trending" row={trending} onRetry={refetchAll} />
      <RowSection title="Popular" row={popular} onRetry={refetchAll} />
      <RowSection title="Top Rated" row={topRated} onRetry={refetchAll} />
      <RowSection title="Upcoming" row={upcoming} onRetry={refetchAll} />
    </div>
  )
}
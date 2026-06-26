import { SearchResults } from './SearchResults'
import { useSearch } from './useSearch'
import { useTranslation } from 'react-i18next'

export function SearchPage() {
  const {
    query,
    setQuery,
    recentSearches,
    movies,
    tvShows,
    people,
    isLoading,
    error,
    hasSearched,
    selectRecentSearch,
  } = useSearch()

  const { t } = useTranslation('search')

  return (
    <div className="py-8">
      <div className="px-6">
        <h1 className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">
          Search
        </h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          autoFocus
          className="w-full max-w-2xl rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-3 text-[var(--color-text-primary)] outline-none focus:border-[var(--color-brand)]"
        />

        {query.trim().length > 0 && query.trim().length < 2 && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Type at least 2 characters to search.
          </p>
        )}

        {!hasSearched && recentSearches.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">
              Recent searches
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => selectRecentSearch(term)}
                  className="rounded-full bg-[var(--color-bg-card)] px-4 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <SearchResults
          movies={movies}
          tvShows={tvShows}
          people={people}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  )
}
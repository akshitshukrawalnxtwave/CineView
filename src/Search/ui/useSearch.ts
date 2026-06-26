import { useCallback, useEffect, useState } from 'react'
import type { MediaItem } from '@/Common'
import { searchMulti } from '../data/searchApi'
import { addRecentSearch, getRecentSearches } from '../data/recentSearchesStorage'
import { groupSearchResults } from '../core/types'
import type { PersonResult } from '../core/types'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches)

  const [movies, setMovies] = useState<MediaItem[]>([])
  const [tvShows, setTvShows] = useState<MediaItem[]>([])
  const [people, setPeople] = useState<PersonResult[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300)
    return () => clearTimeout(timer)
  }, [query])

  const runSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setMovies([])
      setTvShows([])
      setPeople([])
      setHasSearched(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const data = await searchMulti(searchQuery)
      const grouped = groupSearchResults(data.results)

      setMovies(grouped.movies)
      setTvShows(grouped.tvShows)
      setPeople(grouped.people)

      if (data.results.length > 0) {
        setRecentSearches(addRecentSearch(searchQuery))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setMovies([])
      setTvShows([])
      setPeople([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void runSearch(debouncedQuery)
  }, [debouncedQuery, runSearch])

  function selectRecentSearch(term: string) {
    setQuery(term)
  }

  return {
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
  }
}
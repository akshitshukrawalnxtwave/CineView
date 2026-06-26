import { useCallback, useEffect, useState } from 'react'
import type { Genre, MediaItem } from '@/Common'
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieGenres,
  discoverMoviesByGenre,
} from '../data/moviesApi'
import { toMediaItem } from '../core/types'

interface RowState {
  items: MediaItem[]
  isLoading: boolean
  error: string | null
}

interface UseHomePageResult {
  heroMovie: MediaItem | null
  genres: Genre[]
  activeGenreId: number | null
  setActiveGenreId: (id: number | null) => void
  trending: RowState
  popular: RowState
  topRated: RowState
  upcoming: RowState
  refetchAll: () => void
}

const emptyRow = (): RowState => ({ items: [], isLoading: true, error: null })

async function fetchRow(
  fetcher: () => Promise<{ results: Parameters<typeof toMediaItem>[0][] }>
): Promise<{ items: MediaItem[]; error: string | null }> {
  try {
    const data = await fetcher()
    return { items: data.results.map(toMediaItem), error: null }
  } catch (err) {
    return {
      items: [],
      error: err instanceof Error ? err.message : 'Failed to load',
    }
  }
}

export function useHomePage(): UseHomePageResult {
  const [heroMovie, setHeroMovie] = useState<MediaItem | null>(null)
  const [genres, setGenres] = useState<Genre[]>([])
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null)

  const [trending, setTrending] = useState<RowState>(emptyRow)
  const [popular, setPopular] = useState<RowState>(emptyRow)
  const [topRated, setTopRated] = useState<RowState>(emptyRow)
  const [upcoming, setUpcoming] = useState<RowState>(emptyRow)

  const loadRows = useCallback(async (genreId: number | null) => {
    setTrending((r) => ({ ...r, isLoading: true, error: null }))
    setPopular((r) => ({ ...r, isLoading: true, error: null }))
    setTopRated((r) => ({ ...r, isLoading: true, error: null }))
    setUpcoming((r) => ({ ...r, isLoading: true, error: null }))

    const rowFetcher = genreId
      ? () => discoverMoviesByGenre(genreId)
      : null

    const [t, p, tr, u] = await Promise.all([
      fetchRow(genreId ? rowFetcher! : getTrendingMovies),
      fetchRow(genreId ? rowFetcher! : getPopularMovies),
      fetchRow(genreId ? rowFetcher! : getTopRatedMovies),
      fetchRow(genreId ? rowFetcher! : getUpcomingMovies),
    ])

    setTrending({ items: t.items, isLoading: false, error: t.error })
    setPopular({ items: p.items, isLoading: false, error: p.error })
    setTopRated({ items: tr.items, isLoading: false, error: tr.error })
    setUpcoming({ items: u.items, isLoading: false, error: u.error })

    if (!genreId && t.items[0]) setHeroMovie(t.items[0])
  }, [])

  const loadGenres = useCallback(async () => {
    try {
      const data = await getMovieGenres()
      setGenres(data.genres)
    } catch {
      setGenres([])
    }
  }, [])

  useEffect(() => {
    void loadGenres()
    void loadRows(null)
  }, [loadGenres, loadRows])

  useEffect(() => {
    void loadRows(activeGenreId)
  }, [activeGenreId, loadRows])

  return {
    heroMovie,
    genres,
    activeGenreId,
    setActiveGenreId,
    trending,
    popular,
    topRated,
    upcoming,
    refetchAll: () => void loadRows(activeGenreId),
  }
}
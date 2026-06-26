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

function isoDate(daysOffset = 0): string {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().slice(0, 10)
}

export function useHomePage(
  _language: string,
  _region: string
): UseHomePageResult {
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

    let t: { items: MediaItem[]; error: string | null }
    let p: { items: MediaItem[]; error: string | null }
    let tr: { items: MediaItem[]; error: string | null }
    let u: { items: MediaItem[]; error: string | null }

    if (genreId) {
      const today = isoDate()
      const threeMonthsAgo = isoDate(-90)

      ;[t, p, tr, u] = await Promise.all([
        // Trending ≈ popular recent releases in this genre
        fetchRow(() =>
          discoverMoviesByGenre(genreId, {
            sortBy: 'popularity.desc',
            releaseDateGte: threeMonthsAgo,
          })
        ),
        // Popular in this genre
        fetchRow(() =>
          discoverMoviesByGenre(genreId, { sortBy: 'popularity.desc' })
        ),
        // Top rated in this genre
        fetchRow(() =>
          discoverMoviesByGenre(genreId, {
            sortBy: 'vote_average.desc',
            voteCountGte: 200,
          })
        ),
        // Upcoming in this genre
        fetchRow(() =>
          discoverMoviesByGenre(genreId, {
            sortBy: 'primary_release_date.asc',
            releaseDateGte: today,
          })
        ),
      ])

      setHeroMovie(null)
    } else {
      ;[t, p, tr, u] = await Promise.all([
        fetchRow(getTrendingMovies),
        fetchRow(getPopularMovies),
        fetchRow(getTopRatedMovies),
        fetchRow(getUpcomingMovies),
      ])

      if (t.items[0]) setHeroMovie(t.items[0])
    }

    setTrending({ items: t.items, isLoading: false, error: t.error })
    setPopular({ items: p.items, isLoading: false, error: p.error })
    setTopRated({ items: tr.items, isLoading: false, error: tr.error })
    setUpcoming({ items: u.items, isLoading: false, error: u.error })
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
  }, [loadGenres])

  useEffect(() => {
    void loadRows(activeGenreId)
  }, [activeGenreId, loadRows, _language, _region])

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
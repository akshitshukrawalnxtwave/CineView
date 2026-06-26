import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { MediaItem } from '@/Common'
import {
  getMovieById,
  getMovieCredits,
  getMovieSimilar,
  getMovieRecommendations,
  getMovieVideos,
} from '../data/moviesApi'
import type { CastMember, MovieDetail } from '../core/types'
import { toMediaItem } from '../core/types'

interface RowState {
  items: MediaItem[]
  isLoading: boolean
  error: string | null
}

interface UseMovieDetailResult {
  movie: MovieDetail | null
  cast: CastMember[]
  trailerKey: string | null
  similar: RowState
  recommended: RowState
  isLoading: boolean
  error: string | null
  notFound: boolean
  refetch: () => void
}

const emptyRow = (): RowState => ({ items: [], isLoading: true, error: null })

function pickTrailerKey(videos: { key: string; site: string; type: string }[]): string | null {
  const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
  return trailer?.key ?? null
}

export function useMovieDetail(): UseMovieDetailResult {
  const { id } = useParams()
  const movieId = Number(id)

  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [similar, setSimilar] = useState<RowState>(emptyRow)
  const [recommended, setRecommended] = useState<RowState>(emptyRow)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const fetchAll = useCallback(async () => {
    if (!movieId || Number.isNaN(movieId)) {
      setNotFound(true)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    setNotFound(false)
    setSimilar(emptyRow())
    setRecommended(emptyRow())

    try {
      const detail = await getMovieById(movieId)

      if (!detail) {
        setNotFound(true)
        setMovie(null)
        return
      }

      setMovie(detail)

      const [creditsData, similarData, recData, videosData] = await Promise.all([
        getMovieCredits(movieId),
        getMovieSimilar(movieId),
        getMovieRecommendations(movieId),
        getMovieVideos(movieId),
      ])

      setCast(creditsData.cast.slice(0, 20))
      setTrailerKey(pickTrailerKey(videosData.results))

      setSimilar({
        items: similarData.results.map(toMediaItem),
        isLoading: false,
        error: null,
      })
      setRecommended({
        items: recData.results.map(toMediaItem),
        isLoading: false,
        error: null,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie')
      setMovie(null)
    } finally {
      setIsLoading(false)
    }
  }, [movieId])

  useEffect(() => {
    void fetchAll()
  }, [fetchAll])

  return {
    movie,
    cast,
    trailerKey,
    similar,
    recommended,
    isLoading,
    error,
    notFound,
    refetch: fetchAll,
  }
}
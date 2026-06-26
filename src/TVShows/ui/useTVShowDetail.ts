import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTVShowById, getTVShowCredits, getTVShowVideos } from '../data/tvShowsApi'
import type { TVCastMember, TVShowDetail } from '../core/types'

function pickTrailerKey(videos: { key: string; site: string; type: string }[]): string | null {
  const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')
  return trailer?.key ?? null
}

export function useTVShowDetail(language: string, region: string) {
  const { id } = useParams()
  const showId = Number(id)

  const [show, setShow] = useState<TVShowDetail | null>(null)
  const [cast, setCast] = useState<TVCastMember[]>([])
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const fetchShow = useCallback(async () => {
    if (!showId || Number.isNaN(showId)) {
      setNotFound(true)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const detail = await getTVShowById(showId)

      if (!detail) {
        setNotFound(true)
        setShow(null)
        return
      }

      setShow(detail)

      const [creditsData, videosData] = await Promise.all([
        getTVShowCredits(showId),
        getTVShowVideos(showId),
      ])

      setCast(creditsData.cast.slice(0, 20))
      setTrailerKey(pickTrailerKey(videosData.results))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load TV show')
      setShow(null)
    } finally {
      setIsLoading(false)
    }
  }, [showId, language, region])

  useEffect(() => {
    void fetchShow()
  }, [fetchShow, language, region])

  return { show, cast, trailerKey, isLoading, error, notFound, refetch: fetchShow }
}
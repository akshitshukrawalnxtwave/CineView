import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTVSeason } from '../data/tvShowsApi'
import type { Episode } from '../core/types'
import type { z } from 'zod'
import type { seasonDetailSchema } from '../core/schemas'

type SeasonDetail = z.infer<typeof seasonDetailSchema>

export function useSeasonDetail() {
  const { id, seasonNumber } = useParams()
  const showId = Number(id)
  const season = Number(seasonNumber)

  const [seasonData, setSeasonData] = useState<SeasonDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const fetchSeason = useCallback(async () => {
    if (!showId || Number.isNaN(showId) || Number.isNaN(season)) {
      setNotFound(true)
      return
    }

    setIsLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const data = await getTVSeason(showId, season)

      if (!data) {
        setNotFound(true)
        setSeasonData(null)
        return
      }

      setSeasonData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load season')
      setSeasonData(null)
    } finally {
      setIsLoading(false)
    }
  }, [showId, season])

  useEffect(() => {
    void fetchSeason()
  }, [fetchSeason])

  const episodes: Episode[] = seasonData?.episodes ?? []

  return { seasonData, episodes, isLoading, error, notFound, refetch: fetchSeason }
}
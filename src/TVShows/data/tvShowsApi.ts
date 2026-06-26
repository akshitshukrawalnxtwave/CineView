import { tmdbFetch } from '@/Common'
import {
  tvShowDetailSchema,
  tvCreditsSchema,
  tvVideosSchema,
  seasonDetailSchema,
} from '../core/schemas'

function isNotFoundError(err: unknown): boolean {
  return err instanceof Error && err.message.includes('TMDB 404')
}

export async function getTVShowById(id: number) {
  try {
    return await tmdbFetch(`/tv/${id}`, tvShowDetailSchema)
  } catch (err) {
    if (isNotFoundError(err)) return null
    throw err
  }
}

export function getTVShowCredits(id: number) {
  return tmdbFetch(`/tv/${id}/credits`, tvCreditsSchema)
}

export function getTVShowVideos(id: number) {
  return tmdbFetch(`/tv/${id}/videos`, tvVideosSchema)
}

export async function getTVSeason(showId: number, seasonNumber: number) {
  try {
    return await tmdbFetch(
      `/tv/${showId}/season/${seasonNumber}`,
      seasonDetailSchema
    )
  } catch (err) {
    if (isNotFoundError(err)) return null
    throw err
  }
}
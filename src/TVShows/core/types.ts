import type { MediaItem } from '@/Common'
import type { z } from 'zod'
import type { tvShowDetailSchema } from './schemas'

export type TVShowDetail = z.infer<typeof tvShowDetailSchema>
export type TVCastMember = z.infer<typeof import('./schemas').tvCreditsSchema>['cast'][number]
export type Episode = z.infer<typeof import('./schemas').seasonDetailSchema>['episodes'][number]

export function totalEpisodesFromSeasons(
  seasons: { season_number: number; episode_count: number }[]
): number {
  return seasons
    .filter((s) => s.season_number > 0)
    .reduce((sum, s) => sum + s.episode_count, 0)
}

export function tvShowToMediaItem(show: TVShowDetail): MediaItem {
  return {
    id: show.id,
    title: show.name,
    posterPath: show.poster_path,
    backdropPath: show.backdrop_path,
    voteAverage: show.vote_average,
    mediaType: 'tv',
    releaseDate: show.first_air_date,
  }
}
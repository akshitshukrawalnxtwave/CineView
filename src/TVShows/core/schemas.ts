import { z } from 'zod'

export const tvShowDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  first_air_date: z.string().optional(),
  number_of_seasons: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  seasons: z.array(
    z.object({
      season_number: z.number(),
      name: z.string(),
      episode_count: z.number(),
      poster_path: z.string().nullable(),
    })
  ),
})

export const tvCreditsSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string(),
      profile_path: z.string().nullable(),
    })
  ),
})

export const tvVideosSchema = z.object({
  results: z.array(
    z.object({
      key: z.string(),
      site: z.string(),
      type: z.string(),
      name: z.string(),
    })
  ),
})

export const seasonDetailSchema = z.object({
  season_number: z.number(),
  name: z.string(),
  overview: z.string().optional(),
  episodes: z.array(
    z.object({
      id: z.number(),
      episode_number: z.number(),
      name: z.string(),
      overview: z.string(),
      air_date: z.string().nullable(),
      still_path: z.string().nullable(),
      runtime: z.number().nullable().optional(),
    })
  ),
})
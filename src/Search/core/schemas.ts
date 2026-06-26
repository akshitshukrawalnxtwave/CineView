import { z } from 'zod'

const movieResultSchema = z.object({
  id: z.number(),
  media_type: z.literal('movie'),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number(),
  release_date: z.string().optional(),
})

const tvResultSchema = z.object({
  id: z.number(),
  media_type: z.literal('tv'),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number(),
  first_air_date: z.string().optional(),
})

const personResultSchema = z.object({
  id: z.number(),
  media_type: z.literal('person'),
  name: z.string(),
  profile_path: z.string().nullable(),
  known_for: z
    .array(
      z.object({
        title: z.string().optional(),
        name: z.string().optional(),
        media_type: z.string().optional(),
      })
    )
    .optional(),
})

export const searchMultiSchema = z.object({
  page: z.number(),
  results: z.array(
    z.discriminatedUnion('media_type', [
      movieResultSchema,
      tvResultSchema,
      personResultSchema,
    ])
  ),
  total_pages: z.number(),
  total_results: z.number(),
})
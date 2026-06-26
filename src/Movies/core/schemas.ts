import { z } from 'zod'

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string().optional(),
})

export const movieListSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const genreListSchema = z.object({
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
})


export const movieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  tagline: z.string().nullable().optional(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string().optional(),
  runtime: z.number().nullable().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
})

export const creditsSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string(),
      profile_path: z.string().nullable(),
    })
  ),
})

export const videosSchema = z.object({
  results: z.array(
    z.object({
      key: z.string(),
      site: z.string(),
      type: z.string(),
      name: z.string(),
    })
  ),
})
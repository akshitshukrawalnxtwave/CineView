import { z } from 'zod'

export const watchlistStatusSchema = z.enum([
  'want_to_watch',
  'watching',
  'completed',
])

export const mediaRefSchema = z.object({
  mediaType: z.enum(['movie', 'tv']),
  mediaId: z.number().int().positive(),
})

export const mediaSnapshotSchema = z.object({
  title: z.string().min(1),
  posterPath: z.string().nullable(),
  voteAverage: z.number().optional(),
})

export const watchlistEntrySchema = z.object({
  id: z.string().uuid(),
  media: mediaRefSchema,
  status: watchlistStatusSchema,
  note: z.string().max(300).optional(),
  snapshot: mediaSnapshotSchema,
  addedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const watchlistDataSchema = z.object({
  version: z.literal(1),
  entries: z.array(watchlistEntrySchema),
})

export type WatchlistStatus = z.infer<typeof watchlistStatusSchema>
export type MediaRef = z.infer<typeof mediaRefSchema>
export type WatchlistEntry = z.infer<typeof watchlistEntrySchema>
export type WatchlistData = z.infer<typeof watchlistDataSchema>
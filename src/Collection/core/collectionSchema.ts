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
  totalEpisodes: z.number().int().optional(),
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

export const customListItemSchema = z.object({
  id: z.string().uuid(),
  media: mediaRefSchema,
  snapshot: mediaSnapshotSchema,
  addedAt: z.string().datetime(),
})

export const customListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(60),
  description: z.string().max(200).optional(),
  items: z.array(customListItemSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const episodeProgressSchema = z.record(z.string(), z.literal(true))

export const collectionDataSchema = z.object({
  version: z.literal(2),
  watchlist: z.array(watchlistEntrySchema),
  customLists: z.array(customListSchema),
  episodeProgress: episodeProgressSchema,
})

/** @deprecated v1 — used only for migration */
export const watchlistDataSchema = z.object({
  version: z.literal(1),
  entries: z.array(watchlistEntrySchema),
})

export type WatchlistStatus = z.infer<typeof watchlistStatusSchema>
export type MediaRef = z.infer<typeof mediaRefSchema>
export type MediaSnapshot = z.infer<typeof mediaSnapshotSchema>
export type WatchlistEntry = z.infer<typeof watchlistEntrySchema>
export type CustomListItem = z.infer<typeof customListItemSchema>
export type CustomList = z.infer<typeof customListSchema>
export type CollectionData = z.infer<typeof collectionDataSchema>
export type WatchlistData = z.infer<typeof watchlistDataSchema>

export const EMPTY_COLLECTION: CollectionData = {
  version: 2,
  watchlist: [],
  customLists: [],
  episodeProgress: {},
}

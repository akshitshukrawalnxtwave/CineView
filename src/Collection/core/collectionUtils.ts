import type { MediaRef, WatchlistEntry, WatchlistStatus } from './collectionSchema'

export function mediaKey(media: MediaRef): string {
  return `${media.mediaType}:${media.mediaId}`
}

export function episodeKey(tvId: number, season: number, episode: number): string {
  return `${tvId}:${season}:${episode}`
}

export function isEpisodeKeyForShow(key: string, tvId: number): boolean {
  return key.startsWith(`${tvId}:`)
}

export type SortKey = 'dateAdded' | 'rating' | 'title'

export function sortEntries(entries: WatchlistEntry[], sort: SortKey): WatchlistEntry[] {
  return [...entries].sort((a, b) => {
    if (sort === 'dateAdded') return b.addedAt.localeCompare(a.addedAt)
    if (sort === 'rating')
      return (b.snapshot.voteAverage ?? 0) - (a.snapshot.voteAverage ?? 0)
    return a.snapshot.title.localeCompare(b.snapshot.title)
  })
}

export function filterByStatus(
  entries: WatchlistEntry[],
  status: WatchlistStatus | 'all'
): WatchlistEntry[] {
  if (status === 'all') return entries
  return entries.filter((e) => e.status === status)
}

export function snapshotFromMediaItem(item: {
  title: string
  posterPath: string | null
  voteAverage: number
  mediaType: 'movie' | 'tv'
  totalEpisodes?: number
}) {
  return {
    title: item.title,
    posterPath: item.posterPath,
    voteAverage: item.voteAverage,
    ...(item.mediaType === 'tv' && item.totalEpisodes != null
      ? { totalEpisodes: item.totalEpisodes }
      : {}),
  }
}

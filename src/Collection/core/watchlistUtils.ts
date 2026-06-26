import type { MediaRef, WatchlistEntry, WatchlistStatus } from './watchlistSchema'

export function mediaKey(media: MediaRef): string {
  return `${media.mediaType}:${media.mediaId}`
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
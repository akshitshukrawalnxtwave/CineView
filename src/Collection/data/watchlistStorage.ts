import { watchlistDataSchema, type WatchlistData } from '../core/watchlistSchema'

const KEY = 'cineview_watchlist'

const EMPTY: WatchlistData = { version: 1, entries: [] }

export function loadWatchlist(): WatchlistData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = watchlistDataSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : EMPTY
  } catch {
    return EMPTY
  }
}

export function saveWatchlist(data: WatchlistData) {
  const validated = watchlistDataSchema.parse(data) // throws if invalid
  localStorage.setItem(KEY, JSON.stringify(validated))
}
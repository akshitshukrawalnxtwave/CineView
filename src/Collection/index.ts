// Store
export { watchlistStore, initWatchlist } from './data/watchlistRepository'

// Types (from core — re-export for consumers)
export type {
  WatchlistEntry,
  WatchlistStatus,
  MediaRef,
} from './core/watchlistSchema'

// Utils consumers might need
export { sortEntries, filterByStatus } from './core/watchlistUtils'
export type { SortKey } from './core/watchlistUtils'

// UI pages (for router)
export { WatchlistPage } from './ui/WatchlistPage'
export { MyListsPage } from './ui/MyListsPage'
export { ListDetailPage } from './ui/ListDetailPage'

// Shared UI widget (for Movies/TV)
export { WatchlistToggle } from './ui/watchlistToggle'
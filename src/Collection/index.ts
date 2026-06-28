// Store
export {
  collectionStore,
  watchlistStore,
  initCollection,
  initWatchlist,
} from './data/collectionRepository'

// Types
export type {
  WatchlistEntry,
  WatchlistStatus,
  MediaRef,
  CustomList,
  CustomListItem,
  CollectionData,
} from './core/collectionSchema'

export type { AddWatchlistOptions } from './core/collectionStore'

// Utils
export { sortEntries, filterByStatus } from './core/collectionUtils'
export type { SortKey } from './core/collectionUtils'

// UI pages
export { WatchlistPage } from './ui/WatchlistPage'
export { MyListsPage } from './ui/MyListsPage'
export { ListDetailPage } from './ui/ListDetailPage'

// Shared UI widgets
export { WatchlistToggle } from './ui/watchlistToggle'
export { AddToListPopover } from './ui/AddToListPopover'

import { WatchlistStore } from '../core/watchlistStore'
import { loadWatchlist, saveWatchlist } from './watchlistStorage'

export const watchlistStore = new WatchlistStore(loadWatchlist, saveWatchlist)

export function initWatchlist() {
  watchlistStore.hydrate()
}
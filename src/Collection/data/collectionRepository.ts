import { CollectionStore } from '../core/collectionStore'
import { loadCollection, saveCollection } from './collectionStorage'

export const collectionStore = new CollectionStore(loadCollection, saveCollection)

/** @deprecated use collectionStore */
export const watchlistStore = collectionStore

export function initCollection() {
  collectionStore.hydrate()
}

/** @deprecated use initCollection */
export function initWatchlist() {
  initCollection()
}

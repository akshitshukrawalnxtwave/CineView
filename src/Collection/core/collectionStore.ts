import { makeAutoObservable } from 'mobx'
import type { MediaItem } from '@/Common'
import {
  type WatchlistEntry,
  type WatchlistStatus,
  type MediaRef,
  type CollectionData,
  type CustomList,
} from './collectionSchema'
import {
  mediaKey,
  episodeKey,
  isEpisodeKeyForShow,
  snapshotFromMediaItem,
} from './collectionUtils'

type LoadFn = () => CollectionData
type SaveFn = (data: CollectionData) => void

export type AddWatchlistOptions = { totalEpisodes?: number }

export class CollectionStore {
  watchlist: WatchlistEntry[] = []
  customLists: CustomList[] = []
  episodeProgress: Record<string, true> = {}
  hydrated = false

  private loadFn: LoadFn
  private saveFn: SaveFn

  constructor(load: LoadFn, save: SaveFn) {
    this.loadFn = load
    this.saveFn = save
    makeAutoObservable(this)
  }

  /** @deprecated use watchlist — kept for M5 consumers */
  get entries() {
    return this.watchlist
  }

  get totalCount() {
    return this.watchlist.length
  }

  get countByStatus(): Record<WatchlistStatus, number> {
    return {
      want_to_watch: this.watchlist.filter((e) => e.status === 'want_to_watch').length,
      watching: this.watchlist.filter((e) => e.status === 'watching').length,
      completed: this.watchlist.filter((e) => e.status === 'completed').length,
    }
  }

  hydrate() {
    const data = this.loadFn()
    this.watchlist = data.watchlist
    this.customLists = data.customLists
    this.episodeProgress = data.episodeProgress
    this.hydrated = true
  }

  // --- Watchlist ---

  isInWatchlist(media: MediaRef): boolean {
    const key = mediaKey(media)
    return this.watchlist.some((e) => mediaKey(e.media) === key)
  }

  getEntry(media: MediaRef): WatchlistEntry | undefined {
    const key = mediaKey(media)
    return this.watchlist.find((e) => mediaKey(e.media) === key)
  }

  add(item: MediaItem, status: WatchlistStatus = 'want_to_watch', options?: AddWatchlistOptions) {
    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInWatchlist(media)) return

    const now = new Date().toISOString()
    const totalEpisodes =
      item.mediaType === 'tv' ? options?.totalEpisodes : undefined

    const entry: WatchlistEntry = {
      id: crypto.randomUUID(),
      media,
      status,
      snapshot: snapshotFromMediaItem({ ...item, totalEpisodes }),
      addedAt: now,
      updatedAt: now,
    }

    this.watchlist.push(entry)
    this.persist()
  }

  removeFromWatchlist(media: MediaRef) {
    const key = mediaKey(media)
    this.watchlist = this.watchlist.filter((e) => mediaKey(e.media) !== key)

    if (media.mediaType === 'tv') {
      this.clearEpisodeProgressForShow(media.mediaId)
    }

    this.persist()
  }

  /** @deprecated alias */
  remove = this.removeFromWatchlist.bind(this)

  toggle(item: MediaItem, options?: AddWatchlistOptions) {
    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInWatchlist(media)) {
      this.removeFromWatchlist(media)
    } else {
      this.add(item, 'want_to_watch', options)
    }
  }

  updateStatus(id: string, status: WatchlistStatus) {
    const entry = this.watchlist.find((e) => e.id === id)
    if (!entry) return
    entry.status = status
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  updateNote(id: string, note: string) {
    const trimmed = note.slice(0, 300)
    const entry = this.watchlist.find((e) => e.id === id)
    if (!entry) return
    entry.note = trimmed || undefined
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  clearNote(id: string) {
    const entry = this.watchlist.find((e) => e.id === id)
    if (!entry) return
    entry.note = undefined
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  // --- Custom lists ---

  getList(id: string): CustomList | undefined {
    return this.customLists.find((l) => l.id === id)
  }

  isInList(listId: string, media: MediaRef): boolean {
    const list = this.getList(listId)
    if (!list) return false
    const key = mediaKey(media)
    return list.items.some((i) => mediaKey(i.media) === key)
  }

  createList(name: string, description?: string) {
    const trimmedName = name.trim().slice(0, 60)
    if (!trimmedName) return null

    const now = new Date().toISOString()
    const list: CustomList = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: description?.trim().slice(0, 200) || undefined,
      items: [],
      createdAt: now,
      updatedAt: now,
    }

    this.customLists.push(list)
    this.persist()
    return list
  }

  renameList(id: string, name: string) {
    const list = this.getList(id)
    if (!list) return
    const trimmed = name.trim().slice(0, 60)
    if (!trimmed) return
    list.name = trimmed
    list.updatedAt = new Date().toISOString()
    this.persist()
  }

  updateListDescription(id: string, description: string) {
    const list = this.getList(id)
    if (!list) return
    list.description = description.trim().slice(0, 200) || undefined
    list.updatedAt = new Date().toISOString()
    this.persist()
  }

  deleteList(id: string) {
    this.customLists = this.customLists.filter((l) => l.id !== id)
    this.persist()
  }

  addToList(listId: string, item: MediaItem) {
    const list = this.getList(listId)
    if (!list) return

    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInList(listId, media)) return

    const now = new Date().toISOString()
    list.items.push({
      id: crypto.randomUUID(),
      media,
      snapshot: snapshotFromMediaItem(item),
      addedAt: now,
    })
    list.updatedAt = now
    this.persist()
  }

  removeFromList(listId: string, media: MediaRef) {
    const list = this.getList(listId)
    if (!list) return

    const key = mediaKey(media)
    list.items = list.items.filter((i) => mediaKey(i.media) !== key)
    list.updatedAt = new Date().toISOString()
    this.persist()
  }

  toggleListItem(listId: string, item: MediaItem) {
    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInList(listId, media)) {
      this.removeFromList(listId, media)
    } else {
      this.addToList(listId, item)
    }
  }

  // --- Episode progress ---

  isEpisodeWatched(tvId: number, season: number, episode: number): boolean {
    return this.episodeProgress[episodeKey(tvId, season, episode)] === true
  }

  toggleEpisode(tvId: number, season: number, episode: number) {
    const key = episodeKey(tvId, season, episode)
    if (this.episodeProgress[key]) {
      const next = { ...this.episodeProgress }
      delete next[key]
      this.episodeProgress = next
    } else {
      this.episodeProgress = { ...this.episodeProgress, [key]: true }
    }
    this.persist()
  }

  markSeasonWatched(tvId: number, season: number, episodeNumbers: number[]) {
    const next = { ...this.episodeProgress }
    for (const ep of episodeNumbers) {
      next[episodeKey(tvId, season, ep)] = true
    }
    this.episodeProgress = next
    this.persist()
  }

  unmarkSeason(tvId: number, season: number, episodeNumbers: number[]) {
    const next = { ...this.episodeProgress }
    for (const ep of episodeNumbers) {
      delete next[episodeKey(tvId, season, ep)]
    }
    this.episodeProgress = next
    this.persist()
  }

  getSeasonProgress(tvId: number, season: number, totalEpisodes: number) {
    let watched = 0
    for (let ep = 1; ep <= totalEpisodes; ep++) {
      if (this.isEpisodeWatched(tvId, season, ep)) watched++
    }
    return {
      watched,
      total: totalEpisodes,
      percent: totalEpisodes > 0 ? Math.round((watched / totalEpisodes) * 100) : 0,
    }
  }

  getShowProgress(
    tvId: number,
    seasons: { season_number: number; episode_count: number }[]
  ) {
    const regularSeasons = seasons.filter((s) => s.season_number > 0)
    const total = regularSeasons.reduce((sum, s) => sum + s.episode_count, 0)
    let watched = 0
    for (const s of regularSeasons) {
      const progress = this.getSeasonProgress(tvId, s.season_number, s.episode_count)
      watched += progress.watched
    }
    return {
      watched,
      total,
      percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    }
  }

  getShowProgressFromSnapshot(tvId: number, totalEpisodes?: number) {
    let watched = 0
    for (const key of Object.keys(this.episodeProgress)) {
      if (isEpisodeKeyForShow(key, tvId)) watched++
    }
    return {
      watched,
      total: totalEpisodes ?? watched,
      percent: totalEpisodes && totalEpisodes > 0 ? Math.round((watched / totalEpisodes) * 100) : 0,
    }
  }

  private clearEpisodeProgressForShow(tvId: number) {
    const next = { ...this.episodeProgress }
    for (const key of Object.keys(next)) {
      if (isEpisodeKeyForShow(key, tvId)) delete next[key]
    }
    this.episodeProgress = next
  }

  private persist() {
    this.saveFn({
      version: 2,
      watchlist: this.watchlist,
      customLists: this.customLists,
      episodeProgress: this.episodeProgress,
    })
  }
}

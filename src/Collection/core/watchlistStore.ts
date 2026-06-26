import { makeAutoObservable } from 'mobx'
import type { MediaItem } from '@/Common'
import { type WatchlistEntry, type WatchlistStatus, type MediaRef, type WatchlistData } from './watchlistSchema'
import { mediaKey } from './watchlistUtils'
type LoadFn = () => WatchlistData
type SaveFn = (data: WatchlistData) => void
export class WatchlistStore {
  entries: WatchlistEntry[] = []
  hydrated = false
  private load: LoadFn
  private save: SaveFn

  constructor(
    load: LoadFn,
    save: SaveFn
  ) {
    this.load = load
    this.save = save
    makeAutoObservable(this)
  }


  // --- computed ---

  get totalCount() {
    return this.entries.length
  }

  get countByStatus(): Record<WatchlistStatus, number> {
    return {
      want_to_watch: this.entries.filter((e) => e.status === 'want_to_watch').length,
      watching: this.entries.filter((e) => e.status === 'watching').length,
      completed: this.entries.filter((e) => e.status === 'completed').length,
    }
  }

  isInWatchlist(media: MediaRef): boolean {
    const key = mediaKey(media)
    return this.entries.some((e) => mediaKey(e.media) === key)
  }

  getEntry(media: MediaRef): WatchlistEntry | undefined {
    const key = mediaKey(media)
    return this.entries.find((e) => mediaKey(e.media) === key)
  }

  // --- lifecycle ---


  // --- actions ---

  add(item: MediaItem, status: WatchlistStatus = 'want_to_watch') {
    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInWatchlist(media)) return

    const now = new Date().toISOString()
    const entry: WatchlistEntry = {
      id: crypto.randomUUID(),
      media,
      status,
      snapshot: {
        title: item.title,
        posterPath: item.posterPath,
        voteAverage: item.voteAverage,
      },
      addedAt: now,
      updatedAt: now,
    }

    this.entries.push(entry)
    this.persist()
  }

  remove(media: MediaRef) {
    const key = mediaKey(media)
    this.entries = this.entries.filter((e) => mediaKey(e.media) !== key)
    this.persist()
  }

  toggle(item: MediaItem) {
    const media: MediaRef = { mediaType: item.mediaType, mediaId: item.id }
    if (this.isInWatchlist(media)) {
      this.remove(media)
    } else {
      this.add(item, 'want_to_watch')
    }
  }

  updateStatus(id: string, status: WatchlistStatus) {
    const entry = this.entries.find((e) => e.id === id)
    if (!entry) return
    entry.status = status
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }

  updateNote(id: string, note: string) {
    const trimmed = note.slice(0, 300)
    const entry = this.entries.find((e) => e.id === id)
    if (!entry) return
    entry.note = trimmed || undefined
    entry.updatedAt = new Date().toISOString()
    this.persist()
  }
  hydrate() {
    this.entries = this.load().entries
    this.hydrated = true
  }
  private persist() {
    this.save({ version: 1, entries: this.entries })
  }
}

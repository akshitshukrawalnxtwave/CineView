import { describe, it, expect, beforeEach, vi } from 'vitest'
import { WatchlistStore } from './watchlistStore'
import type { WatchlistData } from './watchlistSchema'
import type { MediaItem } from '@/Common'

const sampleMovie: MediaItem = {
  id: 550,
  title: 'Fight Club',
  posterPath: '/poster.jpg',
  backdropPath: null,
  voteAverage: 8.4,
  mediaType: 'movie',
  releaseDate: '1999-10-15',
}

describe('WatchlistStore', () => {
  let saved: WatchlistData | null = null

  const store = new WatchlistStore(
    () => saved ?? { version: 1, entries: [] },
    (data) => {
      saved = data
    }
  )

  beforeEach(() => {
    saved = { version: 1, entries: [] }
    store.entries = []
    vi.stubGlobal('crypto', {
      randomUUID: () => '00000000-0000-4000-8000-000000000099',
    })
  })

  it('adds item with want_to_watch status', () => {
    store.add(sampleMovie)
    expect(store.totalCount).toBe(1)
    expect(store.entries[0]?.status).toBe('want_to_watch')
    expect(store.entries[0]?.snapshot.title).toBe('Fight Club')
  })

  it('toggle adds then removes', () => {
    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(1)

    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(0)
  })

  it('updates status', () => {
    store.add(sampleMovie)
    const id = store.entries[0]!.id
    store.updateStatus(id, 'completed')
    expect(store.entries[0]?.status).toBe('completed')
    expect(saved?.entries[0]?.status).toBe('completed')
  })

  it('truncates note to 300 characters', () => {
    store.add(sampleMovie)
    const id = store.entries[0]!.id
    const longNote = 'a'.repeat(350)
    store.updateNote(id, longNote)
    expect(store.entries[0]?.note?.length).toBe(300)
  })

  it('countByStatus returns correct counts', () => {
    store.add(sampleMovie)
    store.add({ ...sampleMovie, id: 551, title: 'Other' }, 'watching')
    expect(store.countByStatus.want_to_watch).toBe(1)
    expect(store.countByStatus.watching).toBe(1)
    expect(store.countByStatus.completed).toBe(0)
  })
})
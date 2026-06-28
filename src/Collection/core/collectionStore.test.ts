import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CollectionStore } from './collectionStore'
import type { CollectionData } from './collectionSchema'
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

const sampleTv: MediaItem = {
  id: 1399,
  title: 'Game of Thrones',
  posterPath: '/got.jpg',
  backdropPath: null,
  voteAverage: 9.2,
  mediaType: 'tv',
  releaseDate: '2011-04-17',
}

describe('CollectionStore', () => {
  let saved: CollectionData | null = null

  const store = new CollectionStore(
    () => saved ?? { version: 2, watchlist: [], customLists: [], episodeProgress: {} },
    (data) => {
      saved = data
    }
  )

  beforeEach(() => {
    saved = { version: 2, watchlist: [], customLists: [], episodeProgress: {} }
    store.watchlist = []
    store.customLists = []
    store.episodeProgress = {}
    vi.stubGlobal('crypto', {
      randomUUID: () => '00000000-0000-4000-8000-000000000099',
    })
  })

  it('adds item with want_to_watch status', () => {
    store.add(sampleMovie)
    expect(store.totalCount).toBe(1)
    expect(store.watchlist[0]?.status).toBe('want_to_watch')
    expect(store.watchlist[0]?.snapshot.title).toBe('Fight Club')
  })

  it('toggle adds then removes', () => {
    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(1)
    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(0)
  })

  it('updates status and persists', () => {
    store.add(sampleMovie)
    const id = store.watchlist[0]!.id
    store.updateStatus(id, 'completed')
    expect(store.watchlist[0]?.status).toBe('completed')
    expect(saved?.watchlist[0]?.status).toBe('completed')
  })

  it('truncates note to 300 characters', () => {
    store.add(sampleMovie)
    const id = store.watchlist[0]!.id
    store.updateNote(id, 'a'.repeat(350))
    expect(store.watchlist[0]?.note?.length).toBe(300)
  })

  it('clears note', () => {
    store.add(sampleMovie)
    const id = store.watchlist[0]!.id
    store.updateNote(id, 'My note')
    store.clearNote(id)
    expect(store.watchlist[0]?.note).toBeUndefined()
  })

  it('creates custom list with max name length', () => {
    const list = store.createList('a'.repeat(80), 'desc')
    expect(list?.name.length).toBe(60)
    expect(store.customLists).toHaveLength(1)
  })

  it('adds and removes list items independently of watchlist', () => {
    const list = store.createList('Favorites')!
    store.addToList(list.id, sampleMovie)
    expect(store.customLists[0]?.items).toHaveLength(1)
    expect(store.totalCount).toBe(0)

    store.add(sampleMovie)
    expect(store.totalCount).toBe(1)
    expect(store.customLists[0]?.items).toHaveLength(1)
  })

  it('delete list does not remove watchlist entry', () => {
    const list = store.createList('Favorites')!
    store.add(sampleMovie)
    store.addToList(list.id, sampleMovie)
    store.deleteList(list.id)
    expect(store.customLists).toHaveLength(0)
    expect(store.totalCount).toBe(1)
  })

  it('toggles episode watched state', () => {
    expect(store.isEpisodeWatched(1399, 1, 1)).toBe(false)
    store.toggleEpisode(1399, 1, 1)
    expect(store.isEpisodeWatched(1399, 1, 1)).toBe(true)
    store.toggleEpisode(1399, 1, 1)
    expect(store.isEpisodeWatched(1399, 1, 1)).toBe(false)
  })

  it('marks and unmarks entire season', () => {
    store.markSeasonWatched(1399, 1, [1, 2, 3])
    expect(store.getSeasonProgress(1399, 1, 3).watched).toBe(3)
    store.unmarkSeason(1399, 1, [1, 2, 3])
    expect(store.getSeasonProgress(1399, 1, 3).watched).toBe(0)
  })

  it('remove from watchlist clears episode progress for TV show', () => {
    store.add(sampleTv, 'watching', { totalEpisodes: 73 })
    store.toggleEpisode(1399, 1, 1)
    store.toggleEpisode(1399, 1, 2)
    expect(Object.keys(store.episodeProgress)).toHaveLength(2)

    store.removeFromWatchlist({ mediaType: 'tv', mediaId: 1399 })
    expect(store.totalCount).toBe(0)
    expect(Object.keys(store.episodeProgress)).toHaveLength(0)
  })
})

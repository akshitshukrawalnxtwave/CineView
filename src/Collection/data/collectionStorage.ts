import {
  collectionDataSchema,
  watchlistDataSchema,
  EMPTY_COLLECTION,
  type CollectionData,
} from '../core/collectionSchema'

const KEY = 'cineview_collection'
const LEGACY_KEY = 'cineview_watchlist'

function migrateLegacy(): CollectionData | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) return null
    const parsed = watchlistDataSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return null

    const migrated: CollectionData = {
      version: 2,
      watchlist: parsed.data.entries,
      customLists: [],
      episodeProgress: {},
    }

    saveCollection(migrated)
    localStorage.removeItem(LEGACY_KEY)
    return migrated
  } catch {
    return null
  }
}

export function loadCollection(): CollectionData {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = collectionDataSchema.safeParse(JSON.parse(raw))
      if (parsed.success) return parsed.data
    }
  } catch {
    // fall through
  }

  const migrated = migrateLegacy()
  if (migrated) return migrated

  return EMPTY_COLLECTION
}

export function saveCollection(data: CollectionData) {
  const validated = collectionDataSchema.parse(data)
  localStorage.setItem(KEY, JSON.stringify(validated))
}

const STORAGE_KEY = 'cineview_recent_searches'
const MAX_ITEMS = 10

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((q) => typeof q === 'string') : []
  } catch {
    return []
  }
}

export function addRecentSearch(query: string): string[] {
  const trimmed = query.trim()
  if (!trimmed) return getRecentSearches()

  const updated = [trimmed, ...getRecentSearches().filter((q) => q !== trimmed)].slice(
    0,
    MAX_ITEMS
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function clearRecentSearches(): void {
  localStorage.removeItem(STORAGE_KEY)
}
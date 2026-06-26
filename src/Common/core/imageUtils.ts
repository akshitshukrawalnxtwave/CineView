export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function posterUrl(path: string | null, size = 'w500') {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null
}

export function backdropUrl(path: string | null, size = 'w1280') {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null
}
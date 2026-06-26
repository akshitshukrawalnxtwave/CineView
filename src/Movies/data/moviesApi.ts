import { tmdbFetch } from '../../Common'  // or relative import
import {
  movieListSchema,
  genreListSchema,
  movieDetailSchema,
  creditsSchema,
  videosSchema,
} from '../core/schemas'

export function getTrendingMovies() {
  return tmdbFetch('/trending/movie/day', movieListSchema)
}

export function getPopularMovies() {
  return tmdbFetch('/movie/popular', movieListSchema)
}

export function getTopRatedMovies() {
  return tmdbFetch('/movie/top_rated', movieListSchema)
}

export function getUpcomingMovies() {
  return tmdbFetch('/movie/upcoming', movieListSchema)
}

export function getMovieGenres() {
  return tmdbFetch('/genre/movie/list', genreListSchema)
}

type DiscoverOptions = {
  sortBy?: string
  releaseDateGte?: string
  releaseDateLte?: string
  voteCountGte?: number
}
export function discoverMoviesByGenre(genreId: number, options: DiscoverOptions = {}) {
  const params: Record<string, string | number> = {
    with_genres: genreId,
    sort_by: options.sortBy ?? 'popularity.desc',
  }
  if (options.releaseDateGte) params['primary_release_date.gte'] = options.releaseDateGte
  if (options.releaseDateLte) params['primary_release_date.lte'] = options.releaseDateLte
  if (options.voteCountGte) params['vote_count.gte'] = options.voteCountGte
  return tmdbFetch('/discover/movie', movieListSchema, params)
}



function isNotFoundError(err: unknown): boolean {
  return err instanceof Error && err.message.includes('TMDB 404')
}

export async function getMovieById(id: number) {
  try {
    return await tmdbFetch(`/movie/${id}`, movieDetailSchema)
  } catch (err) {
    if (isNotFoundError(err)) return null
    throw err
  }
}

export function getMovieCredits(id: number) {
  return tmdbFetch(`/movie/${id}/credits`, creditsSchema)
}

export function getMovieSimilar(id: number) {
  return tmdbFetch(`/movie/${id}/similar`, movieListSchema)
}

export function getMovieRecommendations(id: number) {
  return tmdbFetch(`/movie/${id}/recommendations`, movieListSchema)
}

export function getMovieVideos(id: number) {
  return tmdbFetch(`/movie/${id}/videos`, videosSchema)
}
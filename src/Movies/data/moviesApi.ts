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

export function discoverMoviesByGenre(genreId: number) {
  return tmdbFetch('/discover/movie', movieListSchema, { with_genres: genreId })
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
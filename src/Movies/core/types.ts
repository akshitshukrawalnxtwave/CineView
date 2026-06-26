import type { MediaItem } from '@/Common'
import type { z } from 'zod'
import type { movieListSchema, movieDetailSchema, creditsSchema } from './schemas'

type RawMovie = z.infer<typeof movieListSchema>['results'][number]
export type MovieDetail = z.infer<typeof movieDetailSchema>
export type CastMember = z.infer<typeof creditsSchema>['cast'][number]

export function toMediaItem(movie: RawMovie): MediaItem {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    voteAverage: movie.vote_average,
    mediaType: 'movie',
    releaseDate: movie.release_date,
  }
}

export function movieDetailToMediaItem(movie: MovieDetail): MediaItem {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    voteAverage: movie.vote_average,
    mediaType: 'movie',
    releaseDate: movie.release_date,
  }
}
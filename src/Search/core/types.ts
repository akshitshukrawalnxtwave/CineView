import type { MediaItem } from '@/Common'
import type { z } from 'zod'
import type { searchMultiSchema } from './schemas'

type SearchResult = z.infer<typeof searchMultiSchema>['results'][number]

export interface PersonResult {
  id: number
  name: string
  profilePath: string | null
  knownFor: string
}

export function toSearchMediaItem(result: SearchResult): MediaItem | null {
  if (result.media_type === 'movie') {
    return {
      id: result.id,
      title: result.title,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path ?? null,
      voteAverage: result.vote_average,
      mediaType: 'movie',
      releaseDate: result.release_date,
    }
  }

  if (result.media_type === 'tv') {
    return {
      id: result.id,
      title: result.name,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path ?? null,
      voteAverage: result.vote_average,
      mediaType: 'tv',
      releaseDate: result.first_air_date,
    }
  }

  return null
}

export function toPersonResult(result: SearchResult): PersonResult | null {
  if (result.media_type !== 'person') return null

  const knownFor =
    result.known_for
      ?.map((item) => item.title ?? item.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ') ?? ''

  return {
    id: result.id,
    name: result.name,
    profilePath: result.profile_path,
    knownFor,
  }
}

export function groupSearchResults(results: SearchResult[]) {
  const movies: MediaItem[] = []
  const tvShows: MediaItem[] = []
  const people: PersonResult[] = []

  for (const result of results) {
    if (result.media_type === 'person') {
      const person = toPersonResult(result)
      if (person) people.push(person)
      continue
    }

    const item = toSearchMediaItem(result)
    if (!item) continue

    if (item.mediaType === 'movie') movies.push(item)
    else tvShows.push(item)
  }

  return { movies, tvShows, people }
}
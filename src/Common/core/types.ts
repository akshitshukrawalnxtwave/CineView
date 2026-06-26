export interface Genre {
    id: number
    name: string
  }
  
  export interface MediaItem {
    id: number
    title: string
    posterPath: string | null
    backdropPath: string | null
    voteAverage: number
    mediaType: 'movie' | 'tv'
    releaseDate?: string
  }
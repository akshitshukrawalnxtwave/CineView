import { tmdbFetch } from '@/Common'
import { searchMultiSchema } from '../core/schemas'

export function searchMulti(query: string) {
  return tmdbFetch('/search/multi', searchMultiSchema, {
    query,
    include_adult: 'false',
  })
}
const BASE = import.meta.env.VITE_TMDB_BASE_URL
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

import { z } from 'zod'

export async function tmdbFetch<T>(
  path: string,
  schema: z.ZodType<T>,
  params?: Record<string, string | number>
): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB ${res.status}: ${path}`)
  }

  const json = await res.json()
  return schema.parse(json)   // Zod validation here
}
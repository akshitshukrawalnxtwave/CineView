// core/preferencesSchema.ts
import { z } from 'zod'

export const preferencesSchema = z.object({
  language: z.enum(['en', 'es']),
  theme: z.enum(['light', 'dark']),
  region: z.string().min(2).max(5),
  version: z.number(),
})

// data/preferencesStorage.ts
const KEY = 'cineview_preferences'

export function loadPreferences() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function savePreferences(data: unknown) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
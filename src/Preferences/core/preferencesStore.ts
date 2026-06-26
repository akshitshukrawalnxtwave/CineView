// core/preferencesStore.ts
import { makeAutoObservable } from 'mobx'
import { preferencesSchema } from './preferencesSchema'
import i18n from '../i18n'
import { loadPreferences, savePreferences } from './preferencesSchema'

export type Theme = 'light' | 'dark'
export type Language = 'en' | 'es'  // your second locale

const DEFAULT_LANGUAGE: Language = 'en'
const DEFAULT_REGION = 'US'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

class PreferencesStore {
  language: Language = DEFAULT_LANGUAGE
  theme: Theme = getSystemTheme()
  region: string = DEFAULT_REGION
  hydrated = false

  constructor() {
    makeAutoObservable(this)
  }

  get tmdbRegion() {
    return this.region  // e.g. 'US', 'IN', 'GB'
  }

  get isDark() {
    return this.theme === 'dark'
  }

  

  get tmdbLanguage() {
    // map app locale → TMDB language code
    return this.language === 'es' ? 'es-ES' : 'en-US'
  }

  hydrate() {
    const stored = loadPreferences()
    const parsed = stored ? preferencesSchema.safeParse(stored) : null

    if (parsed?.success) {
      this.language = parsed.data.language
      this.theme = parsed.data.theme
      this.region = parsed.data.region
    } else {
      this.theme = getSystemTheme()
    }

    this.hydrated = true
    this.applyTheme()
  }

  setLanguage(language: Language) {
    this.language = language
    void i18n.changeLanguage(language)  // UI strings update
    this.persist()
  }

  setTheme(theme: Theme) {
    this.theme = theme
    this.applyTheme()
    this.persist()
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }

  setRegion(region: string) {
    this.region = region
    this.persist()
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme)
  }

  persist() {
    savePreferences({
      language: this.language,
      theme: this.theme,
      region: this.region,
      version: 1,
    })
  }
}

export const preferencesStore = new PreferencesStore()
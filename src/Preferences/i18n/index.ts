// Preferences/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enMovies from './locales/en/movies.json'
import enSearch from './locales/en/search.json'
import enSettings from './locales/en/settings.json'
import esCommon from './locales/es/common.json'
import esAuth from './locales/es/auth.json'
import esMovies from './locales/es/movies.json'
import esSearch from './locales/es/search.json'
import esSettings from './locales/es/settings.json'
import enTv from './locales/en/tv.json'
import esTv from './locales/es/tv.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      movies: enMovies,
      search: enSearch,
      settings: enSettings,
      tv: enTv,
    },
    es: {
      common: esCommon,
      auth: esAuth,
      movies: esMovies,
      search: esSearch,
      settings: esSettings,
      tv: esTv,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
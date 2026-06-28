import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './Preferences/i18n'
import i18n from './Preferences/i18n'
import { preferencesStore } from './Preferences'
preferencesStore.hydrate()
void i18n.changeLanguage(preferencesStore.language)

import { initCollection } from '@/Collection'
initCollection()

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '@/Auth'
import { preferencesStore } from '@/Preferences'
import { LANGUAGE_OPTIONS, REGION_OPTIONS } from '../core/constants'
import { LanguageSwitcher } from './LanguageSwitcher'
import { RegionSelector } from './RegionSelector'
import { ThemeToggle } from './ThemeToggle'

export const SettingsPage = observer(function SettingsPage() {
  const { t } = useTranslation('settings')
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        {t('title')}
      </h1>

      <div className="space-y-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
        <LanguageSwitcher
          label={t('language')}
          value={preferencesStore.language}
          options={LANGUAGE_OPTIONS}
          onChange={(lang) => preferencesStore.setLanguage(lang)}
        />

        <RegionSelector
          label={t('region')}
          value={preferencesStore.region}
          options={REGION_OPTIONS}
          onChange={(region) => preferencesStore.setRegion(region)}
        />

        <ThemeToggle
          variant="labeled"
          label={t('theme')}
          theme={preferencesStore.theme}
          onToggle={() => preferencesStore.toggleTheme()}
        />

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded-lg border border-red-500/30 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          {t('logout')}
        </button>
      </div>
    </div>
  )
})
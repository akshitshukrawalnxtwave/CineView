import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import { getSession } from '@/Auth'
import { observer } from 'mobx-react-lite'
import { ThemeToggle } from '@/Preferences/ui/ThemeToggle'
import { preferencesStore } from '@/Preferences'
import { useTranslation } from 'react-i18next'
export const ShellLayout = observer(function ShellLayout() {

  const navigate = useNavigate()
  const session = getSession()
  const { t } = useTranslation('common')
  // Derive initials from email — e.g. "user@cineview.com" → "U"
  const initials = session?.username
    ? session.username[0].toUpperCase()
    : 'U'

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[var(--color-border)]" style={{ background: '#0d1117' }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold text-[var(--color-text-primary)] hover:text-[var(--color-brand-light)] transition-colors shrink-0"
          >
            {t('footer.title')}
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {[
              { to: '/', label: t('nav.home'), end: true },
              { to: '/watchlist', label: t('nav.watchlist'), badge: 0 },
              { to: '/lists', label: t('nav.lists') },
              { to: '/settings', label: t('nav.settings') },
            ].map(({ to, label, end, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative text-sm font-medium px-3 py-1 rounded transition-colors ${
                    isActive
                      ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-brand-light)] pb-0'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`
                }
              >
                {label}
                {/* Watchlist badge — wired to store in M5, shows 0 for now */}
                {label === t('nav.watchlist') && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-brand)] text-white text-[10px] font-bold leading-none">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Search bar */}
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-4 py-1.5 w-52 text-sm text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] transition-colors whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              {t('nav.searchPlaceholder')}
            </button>

            {/* Theme toggle placeholder — wired in M4 */}
            <ThemeToggle
              theme={preferencesStore.theme}
              onToggle={() => preferencesStore.toggleTheme()}
            />

            {/* Avatar with dropdown */}
            <div className="relative group">
              <button
                type="button"
                aria-label="User menu"
                className="w-8 h-8 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white text-xs font-bold hover:bg-[var(--color-brand-dark)] transition-colors"
              >
                {initials}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-44 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{t('nav.username', { username: session?.username })}</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6" style={{ background: '#0d1117' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{t('footer.title')}</p>
            <p className="text-xs text-[var(--color-text-muted)] max-w-xs leading-relaxed">
              {t('footer.description')}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">© {new Date().getFullYear()} Cine View. {t('footer.dataProvidedBy', { tmdb: 'TMDB' })}</p>
          </div>  

          <div className="flex gap-12 text-xs text-[var(--color-text-muted)]">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[var(--color-text-secondary)] mb-1">{t('footer.explore')}</p>
              <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">{t('footer.about')}</span>
              <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">{t('footer.contact')}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[var(--color-text-secondary)] mb-1">{t('footer.legal')}</p>
              <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">{t('footer.privacyPolicy')}</span>
              <span className="hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">{t('footer.termsOfService')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
})
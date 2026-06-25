import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { clearSession } from '../../Auth/core/session'

export function ShellLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      <nav className="sticky top-0 z-50 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <span className="text-xl font-bold text-[var(--color-brand-light)]">CineView</span>

          <div className="flex items-center gap-4 ml-4">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/watchlist', label: 'Watchlist' },
              { to: '/lists', label: 'Lists' },
              { to: '/settings', label: 'Settings' },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-brand-light)] border-b-2 border-[var(--color-brand-light)] pb-0.5'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <input
              type="text"
              placeholder="Search movies, shows..."
              className="bg-[var(--color-bg-card)] text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-full px-4 py-1.5 w-56 focus:outline-none focus:border-[var(--color-brand)] placeholder:text-[var(--color-text-muted)]"
              onFocus={() => navigate('/search')}
              readOnly
            />
            <button
              onClick={handleLogout}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-[var(--color-text-muted)]">
          <span>CineView © 2024. Data provided by TMDB.</span>
          <div className="flex gap-6">
            <span>About</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

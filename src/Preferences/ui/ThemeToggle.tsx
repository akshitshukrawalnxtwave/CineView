import type { Theme } from '@/Preferences'

interface Props {
  theme: Theme
  onToggle: () => void
  /** compact icon button for navbar */
  variant?: 'icon' | 'labeled'
  label?: string
}

export function ThemeToggle({ theme, onToggle, variant = 'icon', label }: Props) {
  const isDark = theme === 'dark'

  if (variant === 'labeled') {
    return (
      <div className="flex items-center justify-between gap-4">
        {label && (
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {label}
          </span>
        )}

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggle}
          className={`relative h-7 w-12 rounded-full transition-colors ${
            isDark ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    )
  }

  // icon variant — for ShellLayout navbar
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)] transition-colors"
    >
      {isDark ? (
        // moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  )
}
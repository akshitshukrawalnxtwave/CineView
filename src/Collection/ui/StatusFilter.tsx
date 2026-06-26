import { useTranslation } from 'react-i18next'
import type { WatchlistStatus } from '../core/watchlistSchema'

type FilterStatus = WatchlistStatus | 'all'

interface Props {
  active: FilterStatus
  total: number
  counts: Record<WatchlistStatus, number>
  onChange: (status: FilterStatus) => void
}

const TABS: FilterStatus[] = [
  'all',
  'want_to_watch',
  'watching',
  'completed',
]

export function StatusFilter({ active, total, counts, onChange }: Props) {
  const { t } = useTranslation('collection')

  function countFor(tab: FilterStatus): number {
    if (tab === 'all') return total
    return counts[tab]
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab
              ? 'bg-[var(--color-brand)] text-white'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          {t(`filters.${tab}`)}
          <span className="ml-1.5 text-xs opacity-80">({countFor(tab)})</span>
        </button>
      ))}
    </div>
  )
}
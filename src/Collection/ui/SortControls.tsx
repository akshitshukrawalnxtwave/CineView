import { useTranslation } from 'react-i18next'
import type { SortKey } from '../core/watchlistUtils'

interface Props {
  value: SortKey
  onChange: (sort: SortKey) => void
}

const OPTIONS: SortKey[] = ['dateAdded', 'rating', 'title']

export function SortControls({ value, onChange }: Props) {
  const { t } = useTranslation('collection')

  return (
    <div className="mb-6 flex items-center gap-3">
      <label
        htmlFor="watchlist-sort"
        className="text-sm text-[var(--color-text-secondary)]"
      >
        {t('sort.label')}
      </label>
      <select
        id="watchlist-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-brand)]"
      >
        {OPTIONS.map((key) => (
          <option key={key} value={key}>
            {t(`sort.${key}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
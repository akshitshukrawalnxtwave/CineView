import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { watchlistStore } from '../data/watchlistRepository'
import { sortEntries, filterByStatus, type SortKey } from '../core/watchlistUtils'
import type { WatchlistStatus } from '../core/watchlistSchema'
import { StatusFilter } from './StatusFilter'
import { SortControls } from './SortControls'
import { WatchlistItem } from './WatchlistItem'

type FilterStatus = WatchlistStatus | 'all'

export const WatchlistPage = observer(function WatchlistPage() {
  const { t } = useTranslation('collection')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [sort, setSort] = useState<SortKey>('dateAdded')

  const filtered = filterByStatus(watchlistStore.entries, filter)
  const sorted = sortEntries(filtered, sort)

  return (
    <div className="py-8 px-6">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <StatusFilter
        active={filter}
        counts={watchlistStore.countByStatus}
        total={watchlistStore.totalCount}
        onChange={setFilter}
      />

      <SortControls value={sort} onChange={setSort} />

      {sorted.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] py-12">
          {watchlistStore.totalCount === 0 ? t('empty') : t('emptyFiltered')}
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {sorted.map((entry) => (
            <WatchlistItem key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  )
})
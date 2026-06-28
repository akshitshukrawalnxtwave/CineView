import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { collectionStore } from '../data/collectionRepository'
import { sortEntries, filterByStatus, type SortKey } from '../core/collectionUtils'
import type { WatchlistStatus } from '../core/collectionSchema'
import { StatusFilter } from './StatusFilter'
import { SortControls } from './SortControls'
import { WatchlistItem } from './WatchlistItem'

type FilterStatus = WatchlistStatus | 'all'

export const WatchlistPage = observer(function WatchlistPage() {
  const { t } = useTranslation('collection')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [sort, setSort] = useState<SortKey>('dateAdded')

  const filtered = filterByStatus(collectionStore.watchlist, filter)
  const sorted = sortEntries(filtered, sort)

  return (
    <div className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">{t('title')}</h1>

      <StatusFilter
        active={filter}
        counts={collectionStore.countByStatus}
        total={collectionStore.totalCount}
        onChange={setFilter}
      />

      <SortControls value={sort} onChange={setSort} />

      {sorted.length === 0 ? (
        <p className="py-12 text-center text-[var(--color-text-muted)]">
          {collectionStore.totalCount === 0 ? t('empty') : t('emptyFiltered')}
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

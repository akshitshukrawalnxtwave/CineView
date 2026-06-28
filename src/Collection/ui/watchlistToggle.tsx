import { observer } from 'mobx-react-lite'
import type { MediaItem } from '@/Common'
import { collectionStore } from '../data/collectionRepository'
import type { AddWatchlistOptions } from '../core/collectionStore'
import { useTranslation } from 'react-i18next'

interface Props {
  item: MediaItem
  variant?: 'icon' | 'button'
  options?: AddWatchlistOptions
}

export const WatchlistToggle = observer(function WatchlistToggle({
  item,
  variant = 'icon',
  options,
}: Props) {
  const { t } = useTranslation('collection')
  const mediaRef = { mediaType: item.mediaType, mediaId: item.id }
  const inList = collectionStore.isInWatchlist(mediaRef)
  const entry = collectionStore.getEntry(mediaRef)
  const hasNote = Boolean(entry?.note)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    collectionStore.toggle(item, options)
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="relative rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-brand)]"
      >
        {inList ? t('removeFromWatchlist') : t('addToWatchlist')}
        {hasNote && (
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400"
            aria-label={t('notes.hasNote')}
          />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={inList ? t('removeFromWatchlist') : t('addToWatchlist')}
      onClick={handleClick}
      className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${
        inList ? 'bg-[var(--color-brand)]' : 'bg-black/60 hover:bg-[var(--color-brand)]'
      }`}
    >
      {inList ? '✓' : '+'}
    </button>
  )
})

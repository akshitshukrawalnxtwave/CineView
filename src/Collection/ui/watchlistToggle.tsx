import { observer } from 'mobx-react-lite'
import type { MediaItem } from '@/Common'
import { watchlistStore } from '../data/watchlistRepository'
import { useTranslation } from 'react-i18next'

interface Props {
  item: MediaItem
  variant?: 'icon' | 'button'
}

export const WatchlistToggle = observer(function WatchlistToggle({
  item,
  variant = 'icon',
}: Props) {
  const { t } = useTranslation('collection')
  const inList = watchlistStore.isInWatchlist({
    mediaType: item.mediaType,
    mediaId: item.id,
  })

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    watchlistStore.toggle(item)
  }

  if (variant === 'button') {
    return (
      <button type="button" onClick={handleClick} className="...">
        {inList ? t('removeFromWatchlist') : t('addToWatchlist')}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={inList ? t('removeFromWatchlist') : t('addToWatchlist')}
      onClick={handleClick}
      className={`... ${inList ? 'bg-[var(--color-brand)]' : 'bg-black/60'}`}
    >
      {inList ? '✓' : '+'}
    </button>
  )
})
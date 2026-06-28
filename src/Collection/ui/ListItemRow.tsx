import { Link } from 'react-router-dom'
import { PosterImage } from '@/Common'
import type { CustomListItem } from '../core/collectionSchema'
import { collectionStore } from '../data/collectionRepository'
import { useTranslation } from 'react-i18next'

interface Props {
  listId: string
  item: CustomListItem
}

export function ListItemRow({ listId, item }: Props) {
  const { t } = useTranslation('collection')

  const href =
    item.media.mediaType === 'tv'
      ? `/tv/${item.media.mediaId}`
      : `/movie/${item.media.mediaId}`

  const mediaLabel =
    item.media.mediaType === 'tv' ? t('tvShow') : t('movie')

  return (
    <li className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
      <Link to={href} className="shrink-0">
        <PosterImage
          path={item.snapshot.posterPath}
          alt={item.snapshot.title}
          className="h-28 w-20 rounded-lg object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link
            to={href}
            className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand-light)]"
          >
            {item.snapshot.title}
          </Link>
          <p className="text-xs text-[var(--color-text-muted)]">{mediaLabel}</p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => collectionStore.removeFromList(listId, item.media)}
            className="text-sm text-red-400 hover:underline"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </li>
  )
}

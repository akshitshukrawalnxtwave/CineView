import { Link } from 'react-router-dom'
import { PosterImage } from '@/Common'
import type { CustomList } from '../core/collectionSchema'
import { useTranslation } from 'react-i18next'

interface Props {
  list: CustomList
}

export function ListCard({ list }: Props) {
  const { t } = useTranslation('collection')
  const previews = list.items.slice(0, 4)

  return (
    <Link
      to={`/lists/${list.id}`}
      className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition-colors hover:border-[var(--color-brand)]"
    >
      <div className="mb-3 flex h-20 gap-1">
        {previews.length > 0 ? (
          previews.map((item) => (
            <PosterImage
              key={item.id}
              path={item.snapshot.posterPath}
              alt={item.snapshot.title}
              className="h-20 flex-1 rounded-md object-cover"
            />
          ))
        ) : (
          <div className="flex h-20 w-full items-center justify-center rounded-md bg-[var(--color-bg-secondary)] text-xs text-[var(--color-text-muted)]">
            {t('lists.emptyPreview')}
          </div>
        )}
      </div>

      <h3 className="truncate font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-light)]">
        {list.name}
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        {t('lists.itemCount', { count: list.items.length })}
      </p>
    </Link>
  )
}

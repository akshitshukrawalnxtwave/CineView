import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PosterImage } from '@/Common'
import type { WatchlistEntry, WatchlistStatus } from '../core/watchlistSchema'
import { watchlistStore } from '../data/watchlistRepository'
import { useTranslation } from 'react-i18next'

interface Props {
  entry: WatchlistEntry
}

const STATUS_OPTIONS: WatchlistStatus[] = [
  'want_to_watch',
  'watching',
  'completed',
]

export function WatchlistItem({ entry }: Props) {
  const { t } = useTranslation('collection')
  const [note, setNote] = useState(entry.note ?? '')

  const href =
    entry.media.mediaType === 'tv'
      ? `/tv/${entry.media.mediaId}`
      : `/movie/${entry.media.mediaId}`

  const mediaLabel =
    entry.media.mediaType === 'tv' ? t('tvShow') : t('movie')

  function handleNoteBlur() {
    if (note !== (entry.note ?? '')) {
      watchlistStore.updateNote(entry.id, note)
    }
  }

  return (
    <li className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
      <Link to={href} className="shrink-0">
        <PosterImage
          path={entry.snapshot.posterPath}
          alt={entry.snapshot.title}
          className="h-28 w-20 rounded-lg object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              to={href}
              className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand-light)]"
            >
              {entry.snapshot.title}
            </Link>
            <p className="text-xs text-[var(--color-text-muted)]">{mediaLabel}</p>
          </div>

          {entry.snapshot.voteAverage != null && (
            <span className="rounded-md bg-[var(--color-brand)] px-2 py-0.5 text-xs font-bold text-white">
              {entry.snapshot.voteAverage.toFixed(1)}
            </span>
          )}
        </div>

        <select
          value={entry.status}
          onChange={(e) =>
            watchlistStore.updateStatus(entry.id, e.target.value as WatchlistStatus)
          }
          className="w-fit rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-sm text-[var(--color-text-primary)]"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {t(`filters.${status}`)}
            </option>
          ))}
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 300))}
          onBlur={handleNoteBlur}
          placeholder={t('notePlaceholder')}
          rows={2}
          maxLength={300}
          className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-brand)]"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => watchlistStore.remove(entry.media)}
            className="text-sm text-red-400 hover:underline"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </li>
  )
}
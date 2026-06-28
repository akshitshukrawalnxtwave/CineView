import { Link } from 'react-router-dom'
import { PosterImage } from '@/Common'
import type { WatchlistEntry } from '../core/collectionSchema'
import { collectionStore } from '../data/collectionRepository'
import { WatchlistNoteEditor } from './WatchlistNoteEditor'
import { useTranslation } from 'react-i18next'

interface Props {
  entry: WatchlistEntry
}

const STATUS_OPTIONS = ['want_to_watch', 'watching', 'completed'] as const

export function WatchlistItem({ entry }: Props) {
  const { t } = useTranslation('collection')

  const href =
    entry.media.mediaType === 'tv'
      ? `/tv/${entry.media.mediaId}`
      : `/movie/${entry.media.mediaId}`

  const mediaLabel =
    entry.media.mediaType === 'tv' ? t('tvShow') : t('movie')

  const episodeProgress =
    entry.media.mediaType === 'tv'
      ? collectionStore.getShowProgressFromSnapshot(
          entry.media.mediaId,
          entry.snapshot.totalEpisodes
        )
      : null

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

          <div className="flex items-center gap-2">
            {episodeProgress && episodeProgress.watched > 0 && (
              <span className="rounded-md bg-[var(--color-bg-secondary)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
                {t('progress.episodes', {
                  watched: episodeProgress.watched,
                  total: entry.snapshot.totalEpisodes ?? episodeProgress.watched,
                })}
              </span>
            )}
            {entry.snapshot.voteAverage != null && (
              <span className="rounded-md bg-[var(--color-brand)] px-2 py-0.5 text-xs font-bold text-white">
                {entry.snapshot.voteAverage.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        <select
          value={entry.status}
          onChange={(e) =>
            collectionStore.updateStatus(entry.id, e.target.value as typeof STATUS_OPTIONS[number])
          }
          className="w-fit rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-sm text-[var(--color-text-primary)]"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {t(`filters.${status}`)}
            </option>
          ))}
        </select>

        <WatchlistNoteEditor
          note={entry.note}
          onSave={(note) => collectionStore.updateNote(entry.id, note)}
          onClear={() => collectionStore.clearNote(entry.id)}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => collectionStore.removeFromWatchlist(entry.media)}
            className="text-sm text-red-400 hover:underline"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </li>
  )
}

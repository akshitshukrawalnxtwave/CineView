import { posterUrl } from '@/Common'
import type { Episode } from '../core/types'
import { useTranslation } from 'react-i18next'

interface Props {
  episodes: Episode[]
}

export function EpisodeList({ episodes }: Props) {
  const { t } = useTranslation('tv')

  if (episodes.length === 0) {
    return (
      <p className="px-6 py-8 text-center text-[var(--color-text-muted)]">
        {t('noEpisodes')}
      </p>
    )
  }

  return (
    <div className="space-y-4 px-6">
      {episodes.map((episode) => {
        const still = posterUrl(episode.still_path, 'w300')

        return (
          <article
            key={episode.id}
            className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4"
          >
            {still ? (
              <img
                src={still}
                alt=""
                className="h-24 w-40 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-xs text-[var(--color-text-muted)]">
                {t('states.noResults')}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {t('seasonCount_one', { count: episode.episode_number })}
                    {episode.air_date && ` · ${episode.air_date}`}
                    {episode.runtime != null && ` · ${episode.runtime} ${t('minutes')}`}
                  </p>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {episode.name}
                  </h3>
                </div>

                {/* Placeholder — wired in M6 */}
                <input
                  type="checkbox"
                  disabled
                  aria-label={t('actions.markEpisodeAsWatched', { count: episode.episode_number })}
                  className="mt-1 h-4 w-4 cursor-not-allowed opacity-50"
                />
              </div>

              <p className="mt-2 line-clamp-3 text-sm text-[var(--color-text-secondary)]">
                {episode.overview || t('states.noResults')}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
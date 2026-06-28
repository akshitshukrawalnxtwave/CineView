import { observer } from 'mobx-react-lite'
import { posterUrl } from '@/Common'
import { collectionStore } from '@/Collection'
import type { Episode } from '../core/types'
import { useTranslation } from 'react-i18next'

interface Props {
  tvId: number
  seasonNumber: number
  episodes: Episode[]
}

export const EpisodeList = observer(function EpisodeList({
  tvId,
  seasonNumber,
  episodes,
}: Props) {
  const { t } = useTranslation('tv')

  if (episodes.length === 0) {
    return (
      <p className="px-6 py-8 text-center text-[var(--color-text-muted)]">
        {t('states.noEpisodes')}
      </p>
    )
  }

  return (
    <div className="space-y-4 px-6">
      {episodes.map((episode) => {
        const still = posterUrl(episode.still_path, 'w300')
        const watched = collectionStore.isEpisodeWatched(
          tvId,
          seasonNumber,
          episode.episode_number
        )

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
                    E{episode.episode_number}
                    {episode.air_date && ` · ${episode.air_date}`}
                    {episode.runtime != null && ` · ${episode.runtime} min`}
                  </p>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {episode.name}
                  </h3>
                </div>

                <input
                  type="checkbox"
                  checked={watched}
                  onChange={() =>
                    collectionStore.toggleEpisode(tvId, seasonNumber, episode.episode_number)
                  }
                  aria-label={t('actions.markEpisodeAsWatched')}
                  className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
                />
              </div>

              <p className="mt-2 line-clamp-3 text-sm text-[var(--color-text-secondary)]">
                {episode.overview || t('states.noOverview')}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
})

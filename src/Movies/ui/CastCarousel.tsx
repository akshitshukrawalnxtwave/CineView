import { posterUrl } from '@/Common'
import type { CastMember } from '../core/types'

interface Props {
  cast: CastMember[]
}

export function CastCarousel({ cast }: Props) {
  if (cast.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="mb-4 px-6 text-xl font-bold text-[var(--color-text-primary)]">Cast</h2>

      <div className="flex gap-4 overflow-x-auto px-6 pb-2">
        {cast.map((member) => {
          const src = posterUrl(member.profile_path, 'w185')

          return (
            <article key={member.id} className="w-28 shrink-0 text-center">
              {src ? (
                <img
                  src={src}
                  alt={member.name}
                  className="mx-auto h-28 w-28 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)]">
                  N/A
                </div>
              )}

              <p className="mt-2 line-clamp-2 text-sm font-medium text-[var(--color-text-primary)]">
                {member.name}
              </p>
              <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
                {member.character}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
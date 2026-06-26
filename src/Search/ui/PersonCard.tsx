import { posterUrl } from '@/Common'
import type { PersonResult } from '../core/types'

interface Props {
  person: PersonResult
}

export function PersonCard({ person }: Props) {
  const src = posterUrl(person.profilePath, 'w185')

  return (
    <article className="flex w-64 shrink-0 gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3">
      {src ? (
        <img
          src={src}
          alt={person.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-xs text-[var(--color-text-muted)]">
          N/A
        </div>
      )}

      <div className="min-w-0">
        <h3 className="truncate font-medium text-[var(--color-text-primary)]">
          {person.name}
        </h3>
        {person.knownFor && (
          <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
            {person.knownFor}
          </p>
        )}
      </div>
    </article>
  )
}
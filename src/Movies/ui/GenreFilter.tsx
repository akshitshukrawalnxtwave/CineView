import type { Genre } from '@/Common'

interface Props {
  genres: Genre[]
  activeGenreId: number | null
  onSelect: (id: number | null) => void
}

export function GenreFilter({ genres, activeGenreId, onSelect }: Props) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto px-6 pb-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          activeGenreId === null
            ? 'bg-[var(--color-brand)] text-white'
            : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onSelect(genre.id)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeGenreId === genre.id
              ? 'bg-[var(--color-brand)] text-white'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}
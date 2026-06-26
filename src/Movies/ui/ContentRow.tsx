import type { MediaItem } from '@/Common'
import { MovieCard } from './MovieCard'

interface Props {
  title: string
  items: MediaItem[]
}

export function ContentRow({ title, items }: Props) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 px-6 text-xl font-bold text-[var(--color-text-primary)]">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-thin">
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
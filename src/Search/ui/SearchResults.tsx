import type { MediaItem } from '@/Common'
import { AsyncSection } from '@/Common'
import { ContentRow } from '@/Movies/ui/ContentRow'
import { PersonCard } from './PersonCard'
import type { PersonResult } from '../core/types'
import { useTranslation } from 'react-i18next'
interface Props {
  movies: MediaItem[]
  tvShows: MediaItem[]
  people: PersonResult[]
  isLoading: boolean
  error: string | null
  hasSearched: boolean
}

export function SearchResults({
  movies,
  tvShows,
  people,
  isLoading,
  error,
  hasSearched,
}: Props) {
  if (!hasSearched) return null

  const isEmpty = movies.length === 0 && tvShows.length === 0 && people.length === 0

  const { t } = useTranslation('search')

  return (
    <AsyncSection
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage={t('noResults')}
    >
      {movies.length > 0 && <ContentRow title={t('movies')} items={movies} />}

      {tvShows.length > 0 && <ContentRow title={t('tvShows')} items={tvShows} />}

      {people.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 px-6 text-xl font-bold text-[var(--color-text-primary)]">
            {t('people')}
          </h2>
          <div className="flex gap-4 overflow-x-auto px-6 pb-2">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
      )}
    </AsyncSection>
  )
}
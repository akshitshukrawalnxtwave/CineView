import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { collectionStore } from '../data/collectionRepository'
import { CreateListModal } from './CreateListModal'
import { ListCard } from './ListCard'

export const MyListsPage = observer(function MyListsPage() {
  const { t } = useTranslation('collection')
  const [modalOpen, setModalOpen] = useState(false)

  function handleCreate(name: string, description?: string) {
    collectionStore.createList(name, description)
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {t('lists.title')}
        </h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-[var(--color-brand)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-brand-light)]"
        >
          {t('lists.create')}
        </button>
      </div>

      {collectionStore.customLists.length === 0 ? (
        <p className="py-12 text-center text-[var(--color-text-muted)]">{t('lists.empty')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionStore.customLists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}

      <CreateListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
})

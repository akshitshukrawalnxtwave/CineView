import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { collectionStore } from '../data/collectionRepository'
import { DeleteListDialog } from './DeleteListDialog'
import { InlineRename } from './InlineRename'
import { ListItemRow } from './ListItemRow'

export const ListDetailPage = observer(function ListDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation('collection')
  const [deleteOpen, setDeleteOpen] = useState(false)

  const list = id ? collectionStore.getList(id) : undefined

  if (!list) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold text-[var(--color-brand-light)]">404</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">{t('lists.notFound')}</p>
        <Link
          to="/lists"
          className="mt-6 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white"
        >
          {t('lists.backToLists')}
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <InlineRename
            value={list.name}
            onSave={(name) => collectionStore.renameList(list.id, name)}
          />
          {list.description && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{list.description}</p>
          )}
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {t('lists.itemCount', { count: list.items.length })}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="text-sm text-red-400 hover:underline"
        >
          {t('lists.delete')}
        </button>
      </div>

      {list.items.length === 0 ? (
        <p className="py-12 text-center text-[var(--color-text-muted)]">{t('lists.emptyItems')}</p>
      ) : (
        <ul className="space-y-4">
          {list.items.map((item) => (
            <ListItemRow key={item.id} listId={list.id} item={item} />
          ))}
        </ul>
      )}

      <DeleteListDialog
        isOpen={deleteOpen}
        listName={list.name}
        onConfirm={() => collectionStore.deleteList(list.id)}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  )
})

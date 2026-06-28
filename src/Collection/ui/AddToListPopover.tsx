import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import type { MediaItem } from '@/Common'
import { collectionStore } from '../data/collectionRepository'
import { useTranslation } from 'react-i18next'

interface Props {
  item: MediaItem
  variant?: 'icon' | 'button'
}

export const AddToListPopover = observer(function AddToListPopover({
  item,
  variant = 'icon',
}: Props) {
  const { t } = useTranslation('collection')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mediaRef = { mediaType: item.mediaType, mediaId: item.id }

  useEffect(() => {
    if (!open) return

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, listId: string) {
    e.stopPropagation()
    collectionStore.toggleListItem(listId, item)
  }

  const triggerClass =
    variant === 'button'
      ? 'rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-brand)]'
      : 'absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-[var(--color-brand)]'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={t('lists.addToList')}
        aria-expanded={open}
        onClick={handleToggle}
        className={triggerClass}
      >
        {variant === 'button' ? t('lists.addToList') : '☰'}
      </button>

      {open && (
        <div
          className={`absolute z-20 min-w-[200px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 shadow-xl ${
            variant === 'icon' ? 'left-0 top-full mt-1' : 'right-0 top-full mt-1'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {collectionStore.customLists.length === 0 ? (
            <p className="text-xs text-[var(--color-text-muted)]">{t('lists.empty')}</p>
          ) : (
            <ul className="space-y-2">
              {collectionStore.customLists.map((list) => (
                <li key={list.id}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-primary)]">
                    <input
                      type="checkbox"
                      checked={collectionStore.isInList(list.id, mediaRef)}
                      onChange={(e) => handleCheckbox(e, list.id)}
                      className="h-4 w-4 accent-[var(--color-brand)]"
                    />
                    <span className="truncate">{list.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
})

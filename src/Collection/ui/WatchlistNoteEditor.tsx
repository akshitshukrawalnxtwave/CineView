import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  note?: string
  onSave: (note: string) => void
  onClear: () => void
}

export function WatchlistNoteEditor({ note, onSave, onClear }: Props) {
  const { t } = useTranslation('collection')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note ?? '')

  const length = draft.length
  const nearLimit = length > 270

  function startEdit() {
    setDraft(note ?? '')
    setEditing(true)
  }

  function handleSave() {
    onSave(draft)
    setEditing(false)
  }

  function handleCancel() {
    setDraft(note ?? '')
    setEditing(false)
  }

  function handleClear() {
    onClear()
    setDraft('')
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="mt-1">
        {note ? (
          <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
        ) : null}
        <button
          type="button"
          onClick={startEdit}
          className="text-xs text-[var(--color-brand-light)] hover:underline"
        >
          {note ? t('notes.edit') : t('notes.add')}
        </button>
      </div>
    )
  }

  return (
    <div className="mt-1 space-y-2">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value.slice(0, 300))}
        placeholder={t('notePlaceholder')}
        rows={3}
        maxLength={300}
        autoFocus
        className={`w-full resize-none rounded-lg border bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-brand)] ${
          nearLimit ? 'border-amber-500' : 'border-[var(--color-border)]'
        }`}
      />
      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${nearLimit ? 'font-semibold text-amber-500' : 'text-[var(--color-text-muted)]'}`}
        >
          {t('notes.counter', { count: length })}
        </span>
        <div className="flex gap-2">
          {note && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-400 hover:underline"
            >
              {t('notes.clear')}
            </button>
          )}
          <button
            type="button"
            onClick={handleCancel}
            className="text-xs text-[var(--color-text-secondary)] hover:underline"
          >
            {t('notes.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="text-xs font-semibold text-[var(--color-brand-light)] hover:underline"
          >
            {t('notes.save')}
          </button>
        </div>
      </div>
    </div>
  )
}

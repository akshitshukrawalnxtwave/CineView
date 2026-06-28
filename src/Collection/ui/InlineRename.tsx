import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  onSave: (value: string) => void
  className?: string
}

export function InlineRename({ value, onSave, className = '' }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function commit() {
    const trimmed = draft.trim().slice(0, 60)
    if (trimmed && trimmed !== value) onSave(trimmed)
    else setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value.slice(0, 60))}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') {
            setDraft(value)
            setEditing(false)
          }
        }}
        maxLength={60}
        className={`rounded-lg border border-[var(--color-brand)] bg-[var(--color-bg-primary)] px-2 py-1 text-2xl font-bold text-[var(--color-text-primary)] outline-none ${className}`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={`text-left text-2xl font-bold text-[var(--color-text-primary)] hover:text-[var(--color-brand-light)] ${className}`}
    >
      {value}
    </button>
  )
}

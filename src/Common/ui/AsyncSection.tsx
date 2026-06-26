import type { ReactNode } from 'react'

interface Props {
  isLoading: boolean
  error: string | null
  isEmpty?: boolean
  onRetry?: () => void
  emptyMessage?: string
  children: ReactNode
}

export function AsyncSection({
  isLoading,
  error,
  isEmpty = false,
  onRetry,
  emptyMessage = 'No results found.',
  children,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand)] border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-red-300">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 text-sm text-[var(--color-brand-light)] hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <p className="py-8 text-center text-[var(--color-text-muted)]">{emptyMessage}</p>
    )
  }

  return <>{children}</>
}
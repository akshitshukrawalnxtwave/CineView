interface Props {
  title: string
  description: string
  milestone: number
}

export function PlaceholderPage({ title, description, milestone }: Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-brand)]/10 mb-6">
          <span className="text-2xl text-[var(--color-brand-light)] font-bold">M{milestone}</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">{title}</h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Coming in Milestone {milestone}
        </p>
      </div>
    </div>
  )
}

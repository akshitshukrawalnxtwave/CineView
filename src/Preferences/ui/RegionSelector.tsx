interface Option {
    value: string
    label: string
  }
  
  interface Props {
    value: string
    options: readonly Option[]
    onChange: (value: string) => void
    label?: string
    id?: string
  }
  
  export function RegionSelector({
    value,
    options,
    onChange,
    label,
    id = 'region-selector',
  }: Props) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-secondary)]">
            {label}
          </label>
        )}
  
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-brand)]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
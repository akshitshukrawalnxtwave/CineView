import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../core/session'

export function LoginPage() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-brand-light)] mb-2">CineView</h1>
        <p className="text-[var(--color-text-secondary)]">Login page — coming in Milestone 2</p>
      </div>
    </div>
  )
}

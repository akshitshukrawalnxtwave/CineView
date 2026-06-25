import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="text-center max-w-md px-6">
        <h1 className="text-8xl font-bold text-[var(--color-brand-light)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          Page not found
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from '../core/session'

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const location = useLocation()

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  return <>{children}</>
}

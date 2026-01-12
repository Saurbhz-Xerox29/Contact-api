import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../lib/auth.js'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

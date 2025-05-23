import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { LOGIN_ROUTE } from '@/shared/routes'

export const ModeratorRoutes = () => {
  const location = useLocation()
  const user = useUser().user
  const isAllowed = user?.role === 'admin' || user?.role === 'moderator'

  return isAllowed ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace state={{ from: location }} />
}

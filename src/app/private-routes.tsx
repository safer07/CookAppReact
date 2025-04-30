import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { LOGIN_ROUTE } from '@/shared/routes'

export const PrivateRoutes = () => {
  const location = useLocation()
  const user = useUser().user

  return user ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace state={{ from: location }} />
}

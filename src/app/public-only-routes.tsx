import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { LocationState } from '@/shared/model'
import { SETTINGS_ROUTE } from '@/shared/routes'

export const PublicOnlyRoutes = () => {
  const user = useUser().user
  const location = useLocation()
  const { from } = (location.state as LocationState) ?? { from: { pathname: SETTINGS_ROUTE } }

  return user ? <Navigate to={from} replace /> : <Outlet />
}

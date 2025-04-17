import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { SETTINGS_ROUTE } from '@/shared/routes'

export const PublicOnlyRoutes = () => {
  const user = useUser().user

  return user ? <Navigate to={SETTINGS_ROUTE} replace /> : <Outlet />
}

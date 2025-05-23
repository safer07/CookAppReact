import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { DASHBOARD_ROUTE } from '@/shared/routes'
import Loader from '@/shared/ui/loader'

export default function DashboardLayout() {
  return (
    <div className="grid h-svh grid-cols-[16rem_1fr]">
      <nav className="border-base-borders border-r p-3">
        <span className="headline-small">Навигация</span>

        <ul className="mt-2 space-y-1">
          <li>
            <Link to={DASHBOARD_ROUTE} className="text-primary hover:text-primary-active">
              Панель управления
            </Link>
          </li>
          <li>Рецепты</li>
          <li>Пользователи</li>
        </ul>
      </nav>

      <div className="bg-primary-bg/50 h-svh overflow-y-auto">
        <div className="flex h-full flex-col p-3">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

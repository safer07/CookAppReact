import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { DASHBOARD_RECIPES_ROUTE, DASHBOARD_ROUTE } from '@/shared/routes'
import Loader from '@/shared/ui/loader'

import Button from '../button'

export default function DashboardLayout() {
  const pathname: string = useLocation().pathname

  return (
    <div className="grid h-svh grid-cols-[16rem_1fr]">
      <nav className="border-base-borders border-r p-3">
        <span className="headline-small">Навигация</span>

        <ul className="mt-2 space-y-1.5">
          <li>
            <Button
              link={DASHBOARD_ROUTE}
              text="Панель управления"
              className="h-5 justify-start px-1.5 font-normal"
              variant={pathname === DASHBOARD_ROUTE ? 'primary' : undefined}
            />
          </li>
          <li>
            <Button
              link={DASHBOARD_RECIPES_ROUTE}
              text="Рецепты"
              className="h-5 justify-start px-1.5 font-normal"
              variant={pathname.startsWith(DASHBOARD_RECIPES_ROUTE) ? 'primary' : undefined}
            />
          </li>
        </ul>
      </nav>

      <div className="bg-base-bg/50 h-svh">
        <div className="flex h-full flex-col overflow-y-auto p-3">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

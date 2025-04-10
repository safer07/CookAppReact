import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Loader from '@/shared/ui/Loader'
import NavBar from '@/shared/ui/Navbar'

export default function MainLayout() {
  return (
    <div className="grid h-svh grid-rows-[1fr_auto]">
      <Suspense fallback={<Loader />}>
        <div className="layout-grid mobile-no-scroll overflow-y-auto">
          <Outlet />
        </div>
      </Suspense>
      <NavBar />
    </div>
  )
}

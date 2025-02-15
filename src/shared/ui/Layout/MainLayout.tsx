import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '@/shared/ui/Navbar'
import Loader from '@/shared/ui/Loader'

export default function MainLayout() {
  return (
    <div className="flex h-svh flex-col">
      <div className="layout-grid grow overflow-y-auto">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <NavBar />
    </div>
  )
}

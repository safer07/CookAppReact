import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Loader from '@/shared/ui/loader'

export default function FullScreenLayout() {
  return (
    <div className="h-svh">
      <Suspense fallback={<Loader />}>
        <div className="layout-grid">
          <Outlet />
        </div>
      </Suspense>
    </div>
  )
}

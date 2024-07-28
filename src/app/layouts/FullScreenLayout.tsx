import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loader from "../../shared/ui/Loader";

export default function FullScreenLayout() {
  return (
    <div className="layout-grid flex h-svh flex-col">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

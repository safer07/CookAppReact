import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loader from "../../shared/ui/Loader";

export default function FullScreenLayout() {
  return (
    <div className="layout-grid">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

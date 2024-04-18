import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function FullScreenLayout() {
  return (
    <div className="layout-grid">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

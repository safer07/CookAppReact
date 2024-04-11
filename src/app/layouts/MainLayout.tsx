import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../../widgets/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-svh flex-col">
      <div className="layout-grid grow overflow-y-auto">
        <Suspense fallback={<div>Загрузка...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <NavBar />
    </div>
  );
}

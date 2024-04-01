import { Outlet } from "react-router-dom";

import NavBar from "../ui/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-svh flex-col">
      <div className="layout-grid grow overflow-y-auto">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}

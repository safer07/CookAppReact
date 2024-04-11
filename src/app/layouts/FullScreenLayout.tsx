import { Outlet } from "react-router-dom";

export default function FullScreenLayout() {
  return (
    <div className="layout-grid">
      <Outlet />
    </div>
  );
}

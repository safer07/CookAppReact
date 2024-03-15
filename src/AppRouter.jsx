import { Navigate, Route, Routes } from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      {/* <Route path="/modal" element={<ModalPage />} /> */}
      {/* <Route path="/" element={<Navigate to="/recipes" />} /> */}
      {/* <Route path="*" element={<Navigate to="/404" />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

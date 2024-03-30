import { Navigate, Route, Routes } from "react-router-dom";
import RecipesPage from "../pages/RecipesPage";
import RecipePage from "../pages/RecipePage";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<RecipesPage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        {/* <Route path="/" element={<Navigate to="/recipes" />} /> */}
        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

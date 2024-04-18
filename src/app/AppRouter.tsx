import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import FullScreenLayout from "./layouts/FullScreenLayout";
import RecipesPage from "../pages/RecipesPage";
import CookingMode from "../pages/RecipePage/components/CookingMode";

const RecipePage = lazy(() => import("../pages/RecipePage"));
const CreateRecipePage = lazy(() => import("../pages/CreateRecipePage"));
const Profile = lazy(() => import("../pages/Profile"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<RecipesPage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route path="/" element={<FullScreenLayout />}>
        <Route path="recipe/:id/cooking-mode" element={<CookingMode />} />
        <Route path="create-recipe" element={<CreateRecipePage />} />
      </Route>
    </Routes>
  );
}

import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import FullScreenLayout from "./layouts/FullScreenLayout";
import RecipesPage from "../pages/RecipesPage";

const RecipePage = lazy(() => import("../pages/RecipeDetailsPage"));
const CookingMode = lazy(
  () => import("../pages/RecipeDetailsPage/components/CookingMode"),
);
const CreateRecipePage = lazy(() => import("../pages/CreateRecipePage"));
const Profile = lazy(() => import("../pages/Profile"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RecipesPage />} />
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

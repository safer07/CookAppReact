import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import FullScreenLayout from './layouts/FullScreenLayout'
import RecipesPage from '@/pages/Recipes/ui/RecipesPage'
import LoginPage from '@/pages/Login/ui/LoginPage'
import RegistrationPage from '@/pages/Registration/ui/RegistrationPage'

const RecipeDetailsPage = lazy(() => import('@/pages/RecipeDetails'))
const CookingMode = lazy(() => import('@/pages/RecipeDetails/ui/CookingMode'))
const CreateRecipePage = lazy(() => import('@/pages/CreateRecipe'))
const ProfilePage = lazy(() => import('@/pages/Profile'))

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route path="/" element={<FullScreenLayout />}>
        <Route path="recipes/:id/cooking-mode" element={<CookingMode />} />
        <Route path="create-recipe" element={<CreateRecipePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}

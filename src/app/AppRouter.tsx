import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import FullScreenLayout from './layouts/FullScreenLayout'
import RecipesPage from '@/pages/Recipes'

const RecipeDetailsPage = lazy(() => import('@/pages/RecipeDetails'))
const CookingMode = lazy(() => import('@/pages/RecipeDetails/ui/CookingMode'))
const CreateRecipePage = lazy(() => import('@/pages/CreateRecipe'))
const ProfilePage = lazy(() => import('@/pages/Profile'))
const LoginPage = lazy(() => import('@/pages/Login'))
const RegistrationPage = lazy(() => import('@/pages/Registration'))
const Page404 = lazy(() => import('@/pages/404'))

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Page404 />} />
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

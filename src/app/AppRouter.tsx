import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import FullScreenLayout from './layouts/FullScreenLayout'
import RecipesPage from '@/pages/Recipes'
import {
  CREATE_RECIPE_ROUTE,
  EDIT_PROFILE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  RECIPES_ROUTE,
  REGISTRATION_ROUTE,
} from '@/shared/routes'

const RecipeDetails = lazy(() => import('@/pages/RecipeDetails'))
const CookingMode = lazy(() => import('@/pages/RecipeDetails/ui/CookingMode'))
const CreateRecipe = lazy(() => import('@/pages/CreateRecipe'))
const Profile = lazy(() => import('@/pages/Profile'))
const Auth = lazy(() => import('@/pages/Auth'))
const Page404 = lazy(() => import('@/pages/404'))
const ProfileEdit = lazy(() => import('@/pages/ProfileEdit'))

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={RECIPES_ROUTE} element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
        <Route path={PROFILE_ROUTE} element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<FullScreenLayout />}>
        <Route path="recipes/:id/cooking-mode" element={<CookingMode />} />
        <Route path={CREATE_RECIPE_ROUTE} element={<CreateRecipe />} />
        <Route path={LOGIN_ROUTE} element={<Auth />} />
        <Route path={REGISTRATION_ROUTE} element={<Auth />} />
        <Route path={EDIT_PROFILE_ROUTE} element={<ProfileEdit />} />
      </Route>
    </Routes>
  )
}

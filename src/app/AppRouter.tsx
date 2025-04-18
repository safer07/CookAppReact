import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import RecipesPage from '@/pages/Recipes'

import {
  CHANGE_PASSWORD_ROUTE,
  CREATE_RECIPE_ROUTE,
  EDIT_PROFILE_ROUTE,
  EDIT_RECIPE_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  RECIPES_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASSWORD_ROUTE,
  SETTINGS_ROUTE,
} from '@/shared/routes'
import { FullScreenLayout, MainLayout } from '@/shared/ui/Layout'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicOnlyRoutes } from './PublicOnlyRoutes'

const RecipeDetails = lazy(() => import('@/pages/RecipeDetails'))
const CookingMode = lazy(() => import('@/pages/RecipeDetails/ui/CookingMode'))
const EditRecipe = lazy(() => import('@/pages/EditRecipe'))
const Settings = lazy(() => import('@/pages/Settings'))
const Auth = lazy(() => import('@/pages/Auth'))
const Page404 = lazy(() => import('@/pages/404'))
const ProfileEdit = lazy(() => import('@/pages/ProfileEdit'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={RECIPES_ROUTE} element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
        <Route path={SETTINGS_ROUTE} element={<Settings />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<FullScreenLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path={EDIT_PROFILE_ROUTE} element={<ProfileEdit />} />
          <Route path={CREATE_RECIPE_ROUTE} element={<EditRecipe />} />
          <Route path={`${EDIT_RECIPE_ROUTE}/:id`} element={<EditRecipe />} />
          <Route path={CHANGE_PASSWORD_ROUTE} element={<ChangePassword />} />
        </Route>
        <Route element={<PublicOnlyRoutes />}>
          <Route path={LOGIN_ROUTE} element={<Auth />} />
          <Route path={REGISTRATION_ROUTE} element={<Auth />} />
          <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
          <Route path={`${RESET_PASSWORD_ROUTE}/:link`} element={<ChangePassword />} />
        </Route>
        <Route path="recipes/:id/cooking-mode" element={<CookingMode />} />
      </Route>
    </Routes>
  )
}

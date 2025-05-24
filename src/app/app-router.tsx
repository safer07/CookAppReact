import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import RecipesPage from '@/pages/recipes'

import {
  CHANGE_PASSWORD_ROUTE,
  CREATE_RECIPE_ROUTE,
  DASHBOARD_RECIPES_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_PROFILE_ROUTE,
  EDIT_RECIPE_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  RECIPES_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASSWORD_ROUTE,
  SETTINGS_ROUTE,
} from '@/shared/routes'
import { DashboardLayout, FullScreenLayout, MainLayout } from '@/shared/ui/layout'

import { ModeratorRoutes } from './moderator-routes'
import { PrivateRoutes } from './private-routes'
import { PublicOnlyRoutes } from './public-only-routes'

const RecipeDetails = lazy(() => import('@/pages/recipe-details'))
const CookingMode = lazy(() => import('@/pages/recipe-details/ui/cooking-mode'))
const EditRecipe = lazy(() => import('@/pages/edit-recipe'))
const Settings = lazy(() => import('@/pages/settings'))
const Auth = lazy(() => import('@/pages/auth'))
const Page404 = lazy(() => import('@/pages/404'))
const ProfileEdit = lazy(() => import('@/pages/profile-edit'))
const ForgotPassword = lazy(() => import('@/pages/forgot-password'))
const ChangePassword = lazy(() => import('@/pages/change-password'))
const Dashboard = lazy(() => import('@/pages/dashboard'))
const DashboardRecipes = lazy(() => import('@/pages/dashboard-recipes'))
const DashboardRecipe = lazy(() => import('@/pages/dashboard-recipe'))

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
      <Route element={<ModeratorRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={DASHBOARD_RECIPES_ROUTE} element={<DashboardRecipes />} />
          <Route path={'/dashboard/recipes/:id'} element={<DashboardRecipe />} />
        </Route>
      </Route>
    </Routes>
  )
}

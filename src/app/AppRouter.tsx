import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import FullScreenLayout from './layouts/FullScreenLayout'
import RecipesPage from '@/pages/Recipes'

const RecipeDetails = lazy(() => import('@/pages/RecipeDetails'))
const CookingMode = lazy(() => import('@/pages/RecipeDetails/ui/CookingMode'))
const CreateRecipe = lazy(() => import('@/pages/CreateRecipe'))
const Profile = lazy(() => import('@/pages/Profile'))
const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Registration'))
const Page404 = lazy(() => import('@/pages/404'))
const ProfileEdit = lazy(() => import('@/pages/ProfileEdit'))

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="/" element={<FullScreenLayout />}>
        <Route path="recipes/:id/cooking-mode" element={<CookingMode />} />
        <Route path="create-recipe" element={<CreateRecipe />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
      </Route>
    </Routes>
  )
}

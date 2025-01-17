import { useEffect, useState } from 'react'
import axios from 'axios'

import { RecipesErrorResponse } from '../model/types'
import useUser from '@/entities/user/store/store'
import RecipeCard from '@/entities/recipe/ui/RecipeCard'
import Button from '@/shared/ui/Button'
import { BACKEND_URL } from '@/shared/config'
import { CREATE_RECIPE_ROUTE, LOGIN_ROUTE } from '@/shared/routes'

export default function MyRecipes() {
  const { accessToken, user } = useUser()
  const [recipes, setRecipes] = useState<IRecipeItem[]>([])
  const [status, setStatus] = useState<string>('error')
  const [error, setError] = useState<string>('error')

  const skeletonRecipes = [...new Array(4)].map((_, i) => <RecipeCard.Skeleton key={i} />)

  async function fetchUserRecipes() {
    try {
      setError('')
      axios.defaults.baseURL = BACKEND_URL
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      }
      setStatus('loading')
      const { data } = await axios.get<IRecipeItem[]>('/recipes/my-recipes')
      setRecipes(data)
      setStatus('success')
    } catch (error) {
      if (axios.isAxiosError<RecipesErrorResponse>(error)) {
        const data = error.response?.data
        if (data) {
          setError(data?.message)
        }
      }
      setStatus('error')
    }
  }

  useEffect(() => {
    if (user) fetchUserRecipes()
  }, [user])

  if (!user) {
    return (
      <>
        <p className="mt-2">Войдите или зарегистрируйтесь, чтобы создать рецепт</p>
        <Button className="mt-2" text="Войти" icon="login" fullWidth link={LOGIN_ROUTE} />
      </>
    )
  }

  return (
    <>
      <div className="pt-1">
        <Button text="Добавить рецепт" icon="plus" fullWidth link={CREATE_RECIPE_ROUTE} />
      </div>
      <div className="mt-3 pb-2">
        <div>
          <h2 className="headline-medium">Мои рецепты</h2>
        </div>
        {status === 'success' && recipes?.length < 1 && (
          <p className="mt-1">Список рецептов пуст. Создайте новый рецепт</p>
        )}
        {status === 'error' && recipes?.length < 1 && (
          <p className="mt-1 text-system-error">{error}</p>
        )}
        {status !== 'error' && (
          <div className="mt-2 grid gap-2">
            {status === 'loading'
              ? skeletonRecipes
              : recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
          </div>
        )}
      </div>
    </>
  )
}

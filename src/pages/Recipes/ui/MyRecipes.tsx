import { useEffect, useState } from 'react'

import { type Recipe, RecipeCard, recipesService } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import { CREATE_RECIPE_ROUTE, LOGIN_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'

export default function MyRecipes() {
  const { user } = useUser()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  const skeletonRecipes = [...new Array(4)].map((_, i) => <RecipeCard.Skeleton key={i} />)

  async function fetchUserRecipes() {
    try {
      setError(null)
      setStatus('loading')
      const recipes = await recipesService.getUserRecipes()
      setRecipes(recipes)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      catchHttpError(error, setError)
    }
  }

  useEffect(() => {
    if (user) fetchUserRecipes()
  }, [user])

  if (!user) {
    return (
      <>
        <p className="mt-2">Войдите или зарегистрируйтесь, чтобы создать рецепт</p>
        <Button className="mt-2" text="Войти" icon="login" link={LOGIN_ROUTE} />
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
        {status === 'error' ? (
          <ErrorComponent className="mt-1" error={error} />
        ) : (
          <div className="mt-2 grid gap-2">
            {status === 'loading'
              ? skeletonRecipes
              : recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        )}
      </div>
    </>
  )
}

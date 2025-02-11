import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'
import useFavorites from '@/features/favorites/store/store'
import recipesService from '@/entities/recipe/api'
import { Recipe } from '@/entities/recipe/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import catchHttpError from '@/shared/utils/catchHttpError'
import { CustomError } from '@/shared/model/customError'

type HttpStatus = 'init' | 'loading' | 'success' | 'error'

export default function Favorites(): React.JSX.Element {
  const favoriteRecipes = useFavorites((state) => state.favorites.recipes)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  async function fetchFavoriteRecipes() {
    try {
      setStatus('loading')
      const response = await recipesService.getFavoriteRecipes(favoriteRecipes)
      setStatus('success')
      setRecipes(response)
    } catch (error) {
      setStatus('error')
      catchHttpError(error, setError)
    }
  }
  useEffect(() => {
    fetchFavoriteRecipes()
  }, [favoriteRecipes])

  return (
    <div className="py-2">
      <RecipesList title="Рецепты в избранном" recipes={recipes} status={status} />
      <ErrorComponent error={error} className="mt-1" />
    </div>
  )
}

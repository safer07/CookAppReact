import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { useFavorites } from '@/entities/favorites'
import { type Recipe, recipesService } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'

export default function Favorites(): React.JSX.Element {
  const favoriteRecipes = useFavorites(state => state.favorites.recipes)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  useEffect(() => {
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

    fetchFavoriteRecipes()
  }, [favoriteRecipes])

  return (
    <div className="py-2">
      <RecipesList title="Рецепты в избранном" recipes={recipes} status={status} />
      <ErrorComponent error={error} className="mt-1" />
    </div>
  )
}

import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { useFavorites } from '@/entities/favorites'
import { Recipe, recipesService } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { queryClient } from '@/shared/api'
import { catchHttpError } from '@/shared/lib'
import { CustomError } from '@/shared/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'

export default function Favorites(): React.JSX.Element {
  const { user } = useUser()
  const publicFavoriteRecipesIds = useFavorites(state => state.favorites.recipes)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<'error' | 'pending' | 'success'>('success')
  const [error, setError] = useState<CustomError>(null)

  useEffect(() => {
    async function fetchRecipes() {
      if (!user && !publicFavoriteRecipesIds.length) return

      try {
        setError(null)
        setStatus('pending')
        const data = user
          ? await queryClient.fetchQuery({
              queryKey: ['recipes', 'favorites', user.id],
              queryFn: () => recipesService.getUserFavoriteRecipes(),
              staleTime: 1000 * 60 * 30, // 30 минут
              // meta: { errorMessage: 'Не удалось загрузить избранное' },
            })
          : await queryClient.fetchQuery({
              queryKey: ['recipes', 'favorites', 'unauthorized'],
              queryFn: () => recipesService.getPublicFavoriteRecipes(publicFavoriteRecipesIds),
              staleTime: 1000 * 60 * 30, // 30 минут
              // meta: { errorMessage: 'Не удалось загрузить избранное' },
            })
        setStatus('success')
        setRecipes(data)
      } catch (error) {
        setStatus('error')
        setError(catchHttpError(error))
      }
    }

    fetchRecipes()
  }, [user])

  return (
    <div className="py-2">
      <RecipesList title="Рецепты в избранном" recipes={recipes} status={status} />
      <ErrorComponent error={error} className="mt-1" />
    </div>
  )
}

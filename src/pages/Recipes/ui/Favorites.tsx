import { useQuery } from '@tanstack/react-query'

import RecipesList from '@/widgets/RecipesList'

import { useFavorites } from '@/entities/favorites'
import { recipesService } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import ErrorComponent from '@/shared/ui/ErrorComponent'

export default function Favorites(): React.JSX.Element {
  const { user } = useUser()
  const favoriteRecipes = useFavorites(state => state.favorites.recipes)
  const {
    data: recipes = [],
    error: fetchError,
    status,
  } = useQuery({
    queryKey: ['recipes', 'favorites', user?.id],
    queryFn: () => recipesService.getFavoriteRecipes(favoriteRecipes),
    staleTime: 1000 * 60 * 60, // 60 минут
  })
  const error = catchHttpError(fetchError)

  return (
    <div className="py-2">
      <RecipesList title="Рецепты в избранном" recipes={recipes} status={status} />
      <ErrorComponent error={error} className="mt-1" />
    </div>
  )
}

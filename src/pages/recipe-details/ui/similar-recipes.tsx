import { useQuery } from '@tanstack/react-query'

import RecipesList from '@/widgets/recipes-list'

import { recipesService } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import ErrorComponent from '@/shared/ui/error-component'

type SimilarRecipesProps = {
  excludeId: string
}

export default function SimilarRecipes({ excludeId }: SimilarRecipesProps): React.JSX.Element {
  const {
    data: recipes = [],
    status,
    error: fetchError,
  } = useQuery({
    queryKey: ['recipes', 'similar', excludeId],
    queryFn: () => recipesService.getSimilarRecipes(excludeId),
    staleTime: 1000 * 60 * 60, // 60 минут
  })
  const error = catchHttpError(fetchError)

  return (
    <div className="py-2">
      <RecipesList title="Другие рецепты" recipes={recipes} status={status} />
      <ErrorComponent className="mt-1" error={error} />
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'

import { recipesService } from '@/entities/recipe'

export function useMyRecipes(userId: string | undefined) {
  const {
    data: recipes = [],
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['recipes', 'my_recipes', userId],
    queryFn: () => recipesService.getUserRecipes(),
    staleTime: 1000 * 60 * 60, // 60 минут
    enabled: !!userId,
  })

  return { recipes, error, isPending, isError }
}

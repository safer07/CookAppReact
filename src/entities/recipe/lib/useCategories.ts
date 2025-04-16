import { useQuery } from '@tanstack/react-query'

import { recipesService } from '../api/recipeService'

export function useCategories() {
  const {
    data: categories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: recipesService.getCategories,
    staleTime: Infinity,
    meta: {
      errorMessage: 'Не удалось загрузить категории рецептов',
    },
  })

  return { categories, isPending, isError }
}

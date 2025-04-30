import { useQuery } from '@tanstack/react-query'

import { recipesService } from '../api/recipe-service'

export function useIngredients() {
  const {
    data: ingredients = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['ingredients'],
    queryFn: recipesService.getIngredients,
    staleTime: 1000 * 60 * 60 * 24, // 1 день,
    meta: {
      errorMessage: 'Не удалось загрузить ингредиенты',
    },
  })

  return { ingredients, isPending, isError }
}

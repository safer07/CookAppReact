import { useQuery } from '@tanstack/react-query'

import { recipesService } from '@/entities/recipe'

async function fetchFullRecipe(id: string | undefined) {
  if (!id) return
  return await recipesService.getFullRecipe(id)
}

export function useFullRecipe(id: string | undefined) {
  const {
    data: recipe,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchFullRecipe(id),
    staleTime: 1000 * 60 * 60, // 60 минут
    enabled: !!id,
  })

  return { recipe, error, isPending, isError }
}

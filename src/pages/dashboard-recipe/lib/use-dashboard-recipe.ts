import { useQuery } from '@tanstack/react-query'

import { dashboardRecipeService } from '../api/dashboard-recipe-service'

async function fetchDashboardRecipe(id: string | undefined) {
  if (!id) return
  return await dashboardRecipeService.getRecipe(id)
}

export function useDashboardRecipe(id: string | undefined) {
  const {
    data: recipe,
    error,
    isPending,
  } = useQuery({
    queryKey: ['recipe', id, 'dashboard'],
    queryFn: () => fetchDashboardRecipe(id),
    staleTime: 1000 * 60 * 60, // 60 минут
    enabled: !!id,
  })

  return { recipe, error, isPending }
}

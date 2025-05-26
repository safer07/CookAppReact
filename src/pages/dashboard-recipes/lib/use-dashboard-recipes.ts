import { useQuery } from '@tanstack/react-query'

import { dashboardRecipesService } from '../api/dashboard-recipes-service'

export function useDashboardRecipes(status?: string) {
  const {
    data: recipes,
    error,
    isPending,
  } = useQuery({
    queryKey: ['recipes', 'dashboard', status],
    queryFn: () => dashboardRecipesService.getRecipes(status),
    staleTime: 1000 * 60 * 60, // 60 минут
  })

  return { recipes, error, isPending }
}

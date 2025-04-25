import { useQuery } from '@tanstack/react-query'

import { useUser } from '@/entities/user'

import { favoritesService } from '../api'

export function useFetchFavoriteRecipes() {
  const { user } = useUser()
  const { data: userFavorites = [], isLoading } = useQuery({
    queryKey: ['favorites', 'recipes', user?.id ?? 'unauthorized'],
    queryFn: favoritesService.getFavoriteRecipes,
    meta: { errorMessage: 'Не удалось загрузить избранное' },
    staleTime: 1000 * 60 * 30, // 30 минут
    enabled: !!user?.id,
  })

  return { userFavorites, isLoading }
}

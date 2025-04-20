import toast from 'react-hot-toast'

import { useMutation } from '@tanstack/react-query'

import { useUser } from '@/entities/user'

import { queryClient } from '@/shared/api'

import { favoritesService } from '../api'

export function useLikeRecipe(
  id: string,
  setIsOptimistic: (value: React.SetStateAction<boolean>) => void,
  prevValue: boolean,
) {
  const { user } = useUser()
  const { mutate } = useMutation({
    mutationFn: async () => await favoritesService.likeRecipe(id),
    onSuccess: data => {
      queryClient.setQueryData(['favorites', 'recipes', user?.id], data)
      queryClient.invalidateQueries({ queryKey: ['recipes', 'favorites', user?.id] })
    },
    onError: () => {
      setIsOptimistic(prevValue)
      toast.error('Не удалось добавить рецепт в избранное')
    },
  })

  return { mutate }
}

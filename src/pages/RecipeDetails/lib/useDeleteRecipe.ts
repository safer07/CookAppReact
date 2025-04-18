import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { catchHttpError } from '@/shared/lib'
import { RECIPES_ROUTE } from '@/shared/routes'

export function useDeleteRecipe({ recipeId }: { recipeId: string }) {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: () => recipesService.delete(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(RECIPES_ROUTE, { replace: true })
      toast.success('Рецепт удалён')
    },
    onError: error =>
      toast.error(`Не удалось удалить рецепт:
        ${catchHttpError(error)?.message}`),
  })

  return { deleteRecipe: mutate }
}

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { RECIPES_ROUTE } from '@/shared/routes'

export function useDeleteRecipe({ recipeId }: { recipeId: string }) {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: () => recipesService.delete(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(RECIPES_ROUTE, { replace: true })
    },
  })

  return { deleteRecipe: mutateAsync }
}

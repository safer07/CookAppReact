import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { createRecipeDTOSchema, recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { API_PATHS } from '@/shared/config'
import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'

import { createRecipeStore } from '../store/createRecipeStore'

export function useCreateRecipe(setError: (value: React.SetStateAction<CustomError>) => void) {
  const { recipe, resetRecipe } = createRecipeStore()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      setError(null)
      const result = createRecipeDTOSchema.safeParse(recipe)
      if (!result.success) {
        setError({
          errors: formatZodError(result),
        })
        throw new Error('Ошибка ввода данных пользователя')
      } else return await recipesService.create(result.data)
    },
    onSuccess: data => {
      resetRecipe()
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(`${API_PATHS.recipes.getOne}/${data.recipe.id}`, { replace: true })
    },
    onError: data => setError(catchHttpError(data)),
  })

  return { mutateAsync, isPending }
}

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { createRecipeDTOSchema, recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { API_PATHS } from '@/shared/config'
import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'

import { createRecipeStore } from '../store/create-recipe-store'

const userErrorMessage = 'Ошибка ввода данных пользователя'

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
        throw new Error(userErrorMessage)
      } else return await recipesService.create(result.data)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      navigate(`${API_PATHS.recipes.getOne}/${data.recipe.id}`, { replace: true })
      resetRecipe()
    },
    onError: data => {
      if (data.message !== userErrorMessage) setError(catchHttpError(data))
    },
  })

  return { mutateAsync, isPending }
}

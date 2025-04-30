import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { recipesService, updateRecipeDTOSchema } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { catchHttpError, formatZodError, navigateBack } from '@/shared/lib'
import type { CustomError } from '@/shared/model'

import { editRecipeStore } from '../store/edit-recipe-store'

const userErrorMessage = 'Ошибка ввода данных пользователя'

export function useUpdateRecipe(setError: (value: React.SetStateAction<CustomError>) => void) {
  const { recipe } = editRecipeStore()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      setError(null)
      const result = updateRecipeDTOSchema.safeParse(recipe)
      if (!result.success) {
        setError({
          errors: formatZodError(result),
        })
        throw new Error(userErrorMessage)
      } else return await recipesService.update(result.data)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      queryClient.setQueryData(['recipe', data.recipe.id], data.recipe)
      navigateBack(navigate)
    },
    onError: data => {
      if (data.message !== userErrorMessage) setError(catchHttpError(data))
    },
  })

  return { mutateAsync, isPending }
}

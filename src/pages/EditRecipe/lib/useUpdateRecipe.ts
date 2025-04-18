import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { recipesService, updateRecipeDTOSchema } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { queryClient } from '@/shared/api'
import { formatZodError, navigateBack } from '@/shared/lib'
import { CustomError } from '@/shared/model'

import { editRecipeStore } from '../store/editRecipeStore'

export function useUpdateRecipe(setError: (value: React.SetStateAction<CustomError>) => void) {
  const { user } = useUser()
  const { recipe } = editRecipeStore()
  const navigate = useNavigate()
  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
      const result = updateRecipeDTOSchema.safeParse(recipe)
      if (!result.success) {
        setError({
          errors: formatZodError(result),
        })
        throw new Error('Ошибка ввода данных пользователя')
      } else return await recipesService.update(result.data)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['recipes', 'my_recipes', user?.id] })
      // TODO: не инвалидировать, а перезаписать
      queryClient.invalidateQueries({ queryKey: ['recipe', data.recipe.id] })
      navigateBack(navigate)
      toast.success('Рецепт обновлён')
    },
  })

  return { mutate, error, isPending }
}

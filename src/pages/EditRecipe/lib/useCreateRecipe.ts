import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { createRecipeDTOSchema, recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'
import { API_PATHS } from '@/shared/config'
import { formatZodError } from '@/shared/lib'
import { CustomError } from '@/shared/model'

import { createRecipeStore } from '../store/createRecipeStore'

export function useCreateRecipe(setError: (value: React.SetStateAction<CustomError>) => void) {
  const { recipe, resetRecipe } = createRecipeStore()
  const navigate = useNavigate()
  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
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
      toast.success('Рецепт создан')
    },
  })

  return { mutate, error, isPending }
}

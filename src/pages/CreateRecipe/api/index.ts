import { createRecipeResponseSchema } from '../model/api'
import { CreateRecipeDTO } from '../model'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

export default async function createRecipe(recipeData: CreateRecipeDTO) {
  // TODO: 'Content-Type': formdata когда будет загрузка фото, сейчас как json
  const { data } = await api.post<unknown>(API_PATHS.recipes.createRecipe, recipeData)
  const validatedData = createRecipeResponseSchema.parse(data)
  return validatedData
}

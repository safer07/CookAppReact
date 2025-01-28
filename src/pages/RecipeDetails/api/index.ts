import { fullRecipeSchema } from '@/entities/recipe/model'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

export default async function getFullRecipe(id: string) {
  const { data } = await api.get<unknown>(`${API_PATHS.recipes.getOne}/${id}`)
  const validatedData = fullRecipeSchema.parse(data)
  return validatedData
}

import { addRecipeResponseSchema, removeRecipeResponseSchema } from '../model/api'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

const favoritesService = {
  addRecipe: async (id: string) => {
    const { data } = await api.get<unknown>(`${API_PATHS.favorites.addRecipe}/${id}`)
    const validatedData = addRecipeResponseSchema.parse(data)
    return validatedData
  },

  removeRecipe: async (id: string) => {
    const { data } = await api.delete<unknown>(`${API_PATHS.favorites.removeRecipe}/${id}`)
    const validatedData = removeRecipeResponseSchema.parse(data)
    return validatedData
  },
}

export default favoritesService

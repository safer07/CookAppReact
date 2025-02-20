import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { addRecipeResponseSchema, removeRecipeResponseSchema } from '../model/api'

export const favoritesService = {
  addRecipe: async (id: string) => {
    const { data } = await api.post<unknown>(`${API_PATHS.favorites.addRecipe}/${id}`)
    const validatedData = addRecipeResponseSchema.parse(data)
    return validatedData
  },

  removeRecipe: async (id: string) => {
    const { data } = await api.delete<unknown>(`${API_PATHS.favorites.removeRecipe}/${id}`)
    const validatedData = removeRecipeResponseSchema.parse(data)
    return validatedData
  },
}

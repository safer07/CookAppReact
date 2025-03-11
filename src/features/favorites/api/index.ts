import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import {
  addRecipeResponseSchema,
  getFavoritesResponseSchema,
  removeRecipeResponseSchema,
} from '../model/api'

export const favoritesService = {
  getFavorites: async () => {
    const { data } = await api.get<unknown>(API_PATHS.favorites.getFavorites)
    const validatedData = getFavoritesResponseSchema.parse(data)
    return validatedData
  },

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

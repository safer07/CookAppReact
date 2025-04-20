import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import {
  addRecipeResponseSchema,
  getFavoriteRecipesResponseSchema,
  removeRecipeResponseSchema,
} from '../model/api'

export const favoritesService = {
  getFavoriteRecipes: async () => {
    const { data } = await api.get<unknown>(API_PATHS.favorites.getFavoriteRecipes)
    const validatedData = getFavoriteRecipesResponseSchema.parse(data)
    return validatedData
  },

  likeRecipe: async (id: string) => {
    const { data } = await api.post<unknown>(`${API_PATHS.favorites.likeRecipe}/${id}`)
    const validatedData = addRecipeResponseSchema.parse(data)
    return validatedData
  },

  unLikeRecipe: async (id: string) => {
    const { data } = await api.delete<unknown>(`${API_PATHS.favorites.unlikeRecipe}/${id}`)
    const validatedData = removeRecipeResponseSchema.parse(data)
    return validatedData
  },
}

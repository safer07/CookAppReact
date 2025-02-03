import { fullRecipeSchema, RecipesFilters } from '../model'
import { recipesResponseSchema } from '@/entities/recipe/model/api'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

const recipesService = {
  getRecipes: async (filters?: RecipesFilters) => {
    // TODO: добавить возможность выбора несколько категорий

    const { data } = await api.get<unknown>(API_PATHS.recipes.getAll, {
      params: { category: filters?.categoryId, query: filters?.searchQuery },
    })
    const validatedData = recipesResponseSchema.parse(data)
    return validatedData
  },

  getFullRecipe: async (id: string) => {
    const { data } = await api.get<unknown>(`${API_PATHS.recipes.getOne}/${id}`)
    const validatedData = fullRecipeSchema.parse(data)
    return validatedData
  },

  getSimilarRecipes: async (excludeId: string) => {
    const { data } = await api.get<unknown>(`${API_PATHS.recipes.getSimilar}/${excludeId}`)
    const validatedData = recipesResponseSchema.parse(data)
    return validatedData
  },

  getUserRecipes: async () => {
    const { data } = await api.get<unknown>(API_PATHS.recipes.myRecipes)
    const validatedData = recipesResponseSchema.parse(data)
    return validatedData
  },
}

export default recipesService

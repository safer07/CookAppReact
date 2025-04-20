import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import {
  createRecipeResponseSchema,
  deleteRecipeResponseSchema,
  getCategoriesResponseSchema,
  recipesResponseSchema,
} from '../model/api'
import { fullRecipeSchema } from '../model/recipe'
import type { CreateRecipeDTO, RecipeFilters, UpdateRecipeDTO } from '../model/recipe'

export const recipesService = {
  getRecipes: async (filters?: Partial<RecipeFilters>, limit?: number) => {
    // TODO: filters передавать целиком, а query разворачивать отдельно?
    const query = filters?.searchQuery || null
    const { data } = await api.get<unknown>(API_PATHS.recipes.getAll, {
      params: { query, limit, category: filters?.categories, difficulty: filters?.difficulties },
      paramsSerializer: { indexes: null },
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

  getUserFavoriteRecipes: async () => {
    const { data } = await api.get<unknown>(API_PATHS.recipes.favorite)
    const validatedData = recipesResponseSchema.parse(data)
    return validatedData
  },

  getPublicFavoriteRecipes: async (ids: string[]) => {
    const { data } = await api.post<unknown>(API_PATHS.recipes.favorite, ids)
    const validatedData = recipesResponseSchema.parse(data)
    return validatedData
  },

  create: async (recipeData: CreateRecipeDTO) => {
    // TODO: 'Content-Type': formdata когда будет загрузка фото, сейчас как json
    const { data } = await api.post<unknown>(API_PATHS.recipes.createRecipe, recipeData)
    const validatedData = createRecipeResponseSchema.parse(data)
    return validatedData
  },

  update: async (recipeData: UpdateRecipeDTO) => {
    // TODO: 'Content-Type': formdata когда будет загрузка фото, сейчас как json
    const { data } = await api.put<unknown>(
      `${API_PATHS.recipes.updateRecipe}/${recipeData.id}`,
      recipeData,
    )
    const validatedData = createRecipeResponseSchema.parse(data)
    return validatedData
  },

  delete: async (id: string) => {
    const { data } = await api.delete<unknown>(`${API_PATHS.recipes.delete}/${id}`)
    const validatedData = deleteRecipeResponseSchema.parse(data)
    return validatedData
  },

  getCategories: async () => {
    const { data } = await api.get<unknown>(API_PATHS.recipes.getCategories)
    const validatedData = getCategoriesResponseSchema.parse(data)
    return validatedData
  },
}

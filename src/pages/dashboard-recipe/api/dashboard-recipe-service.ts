import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { recipeModerationResponseSchema } from '../model/api'
import type { RecipeModerationDTO } from '../model/api'
import { dashboardFullRecipeSchema } from '../model/dashboard-full-recipe'

export const dashboardRecipeService = {
  getRecipe: async (id: string) => {
    const { data } = await api.get<unknown>(`${API_PATHS.dashboard.recipes.getOne}/${id}`)
    const validatedData = dashboardFullRecipeSchema.parse(data)
    return validatedData
  },
  updateRecipe: async (id: string, DTO: RecipeModerationDTO) => {
    const { data } = await api.patch<unknown>(`${API_PATHS.dashboard.recipes.update}/${id}`, DTO)
    const validatedData = recipeModerationResponseSchema.parse(data)
    return validatedData
  },
}

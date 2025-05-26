import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { dashboardRecipesResponseSchema } from '../model/api'

export const dashboardRecipesService = {
  getRecipes: async (status?: string) => {
    const { data } = await api.get<unknown>(API_PATHS.dashboard.getRecipes, { params: { status } })
    const validatedData = dashboardRecipesResponseSchema.parse(data)
    return validatedData
  },
}

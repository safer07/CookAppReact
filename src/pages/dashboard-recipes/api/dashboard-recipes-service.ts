import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { dashboardRecipesResponseSchema } from '../model/api'

export const dashboardRecipesService = {
  getPendingRecipes: async () => {
    const { data } = await api.get<unknown>(API_PATHS.dashboard.getPendingRecipes)
    const validatedData = dashboardRecipesResponseSchema.parse(data)
    return validatedData
  },
}

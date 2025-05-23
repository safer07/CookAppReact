import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { dashboardRecipesResponseSchema, dashboardResponseSchema } from '../model/api'

export const dashboardService = {
  getDashboard: async () => {
    const { data } = await api.get<unknown>(API_PATHS.dashboard.getDashboard)
    const validatedData = dashboardResponseSchema.parse(data)
    return validatedData
  },
  getPendingRecipes: async () => {
    const { data } = await api.get<unknown>(API_PATHS.dashboard.getPendingRecipes)
    const validatedData = dashboardRecipesResponseSchema.parse(data)
    return validatedData
  },
}

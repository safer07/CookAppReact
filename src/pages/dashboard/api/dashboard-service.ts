import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import { dashboardResponseSchema } from '../model/api'

export const dashboardService = {
  getDashboard: async () => {
    const { data } = await api.get<unknown>(API_PATHS.dashboard.getDashboard)
    const validatedData = dashboardResponseSchema.parse(data)
    return validatedData
  },
}

import { z } from 'zod'

import { dashboardRecipeSchema } from './dashboard-recipe'

// -----
// -----
// ----- Response -----
// -----
// -----
export const dashboardRecipesResponseSchema = z.array(dashboardRecipeSchema)

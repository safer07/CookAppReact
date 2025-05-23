import { z } from 'zod'

import { recipeSchema } from '@/entities/recipe/model/recipe'

export const dashboardRecipeSchema = recipeSchema.extend({
  status: z.enum(['approved', 'rejected', 'pending']),
  moderationMessage: z.string().nullish(),
  author: z.object({ email: z.string().email() }),
})
export type DashboardRecipe = z.infer<typeof dashboardRecipeSchema>

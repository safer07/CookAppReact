import { z } from 'zod'

import { fullRecipeSchema } from '@/entities/recipe/model/recipe'

export const dashboardFullRecipeSchema = fullRecipeSchema.extend({
  status: z.enum(['approved', 'rejected', 'pending']),
  moderationMessage: z.string().nullish(),
})
export type DashboardFullRecipe = z.infer<typeof dashboardFullRecipeSchema>

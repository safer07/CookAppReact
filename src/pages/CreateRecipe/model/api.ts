import { z } from 'zod'

import { fullRecipeSchema } from '@/entities/recipe/model'

export const createRecipeResponseSchema = z.object({
  message: z.string(),
  recipe: fullRecipeSchema,
})
export type CreateRecipeResponse = z.infer<typeof createRecipeResponseSchema>

import { z } from 'zod'

import { recipeSchema } from '@/entities/recipe/model'

export const recipesResponseSchema = z.array(recipeSchema)
export type RecipesResponse = z.infer<typeof recipesResponseSchema>

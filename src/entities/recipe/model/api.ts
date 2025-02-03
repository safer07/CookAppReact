import { z } from 'zod'

import { recipeSchema } from '.'

export const recipesResponseSchema = z.array(recipeSchema)
export type RecipesResponse = z.infer<typeof recipesResponseSchema>

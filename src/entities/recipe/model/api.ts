import { z } from 'zod'

import { fullRecipeSchema, recipeSchema } from './recipe'

export const recipesResponseSchema = z.array(recipeSchema)

export const createRecipeResponseSchema = z.object({
  message: z.string(),
  recipe: fullRecipeSchema,
})

export const deleteRecipeResponseSchema = z.object({
  message: z.string(),
})

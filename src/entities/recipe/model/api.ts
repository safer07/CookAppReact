import { z } from 'zod'

import { fullRecipeSchema, recipeSchema } from './recipe'
import { recipeCategorySchema } from './recipeCategory'

export const recipesResponseSchema = z.array(recipeSchema)

export const createRecipeResponseSchema = z.object({
  message: z.string(),
  recipe: fullRecipeSchema,
})

export const deleteRecipeResponseSchema = z.object({
  message: z.string(),
})

export const getCategoriesResponseSchema = z.array(recipeCategorySchema)

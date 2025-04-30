import { z } from 'zod'

import { ingredientSchema } from './ingredient'
import { fullRecipeSchema, recipeSchema } from './recipe'
import { recipeCategorySchema } from './recipe-category'

export const recipesResponseSchema = z.array(recipeSchema)

export const createRecipeResponseSchema = z.object({
  message: z.string(),
  recipe: fullRecipeSchema,
})

export const deleteRecipeResponseSchema = z.string()

export const getCategoriesResponseSchema = z.array(recipeCategorySchema)

export const getIngredientsResponseSchema = z.array(ingredientSchema)

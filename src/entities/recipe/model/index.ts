import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
})
export type Ingredient = z.infer<typeof ingredientSchema>

export const recipeStepSchema = z.object({
  description: z.string().min(5, { message: 'Описание шага рецепта слишком короткое' }),
  ingredients: z.array(ingredientSchema),
  img: z.string(),
  // img: z.string().url(),
})
export type RecipeStep = z.infer<typeof recipeStepSchema>

export const recipeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  category: z.string(),
  // TODO: убрать optional на проде
  author: z.string().optional(),
  img: z.string(),
  // TODO: когда фотки будут загружены на сервер
  // img: z.string().url(),
  time: z.number().positive('Время должно быть больше 0'),
  difficulty: z.number(),
  hidden: z.boolean(),
})
export type Recipe = z.infer<typeof recipeSchema>

export const fullRecipeSchema = recipeSchema.extend({
  description: z.string(),
  totalIngredients: z.array(ingredientSchema),
  steps: z.array(recipeStepSchema),
})
export type FullRecipe = z.infer<typeof fullRecipeSchema>

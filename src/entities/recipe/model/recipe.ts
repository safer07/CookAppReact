import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
})
export type Ingredient = z.infer<typeof ingredientSchema>

export const recipeStepSchema = z.object({
  description: z.string().trim().min(5, { message: 'Описание шага рецепта слишком короткое' }),
  ingredients: z.array(ingredientSchema),
  img: z.string(),
  // img: z.string().url(),
})
export type RecipeStep = z.infer<typeof recipeStepSchema>

export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.number(),
  authorId: z.string().uuid(),
  img: z.string(),
  // TODO: когда фотки будут загружены на сервер
  // img: z.string().url(),
  time: z.number().positive('Время должно быть больше 0'),
  difficulty: z.number(),
  hidden: z.boolean().optional(),
})
export type Recipe = z.infer<typeof recipeSchema>

export const fullRecipeSchema = recipeSchema.extend({
  description: z.string(),
  totalIngredients: z.array(ingredientSchema),
  steps: z.array(recipeStepSchema),
})
export type FullRecipe = z.infer<typeof fullRecipeSchema>

export type RecipeFilters = {
  categories: number[]
  searchQuery?: string
}

export const createRecipeDTOSchema = z
  .object({
    name: z
      .string({ required_error: 'Введите название рецепта' })
      .trim()
      .min(3, 'Название рецепта слишком короткое'),
    categoryId: z.number({ required_error: 'Выберите категорию рецепта' }),
    img: z.string({ required_error: 'Не выбрано главное изображение рецепта' }),
    // TODO: когда фотки будут загружены на сервер
    // img: z.string().url(),
    time: z
      .number({ required_error: 'Укажите время приготовления рецепта' })
      .positive('Время должно быть больше 0')
      .step(1),
    difficulty: z.number({ required_error: 'Укажите сложность рецепта' }),
    description: z
      .string({ required_error: 'Введите описание рецепта' })
      .trim()
      .min(10, 'Описание рецепта должно состоять минимум из 10 символов'),
    totalIngredients: z.array(ingredientSchema).nonempty('Список ингредиентов пуст'),
    steps: z.array(recipeStepSchema).nonempty('Не указаны шаги приготовления рецепта'),
    hidden: z.boolean(),
  })
  .refine(
    data =>
      data.totalIngredients.length ===
      data.steps.reduce((sum, current) => sum + current.ingredients.length, 0),
    {
      message: 'Распределите все указанные ингредиенты по шагам рецепта',
      path: ['totalIngredients'],
    },
  )
export type CreateRecipeDTO = z.infer<typeof createRecipeDTOSchema>

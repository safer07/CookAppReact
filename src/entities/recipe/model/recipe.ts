import { z } from 'zod'

export const recipeIngredientSchema = z.object({
  amount: z.number(),
  unitId: z.number(),
})
export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>

export const recipeStepSchema = z.object({
  description: z.string().trim().min(5, { message: 'Описание шага рецепта слишком короткое' }),
  ingredients: z.array(recipeIngredientSchema),
  img: z.string(),
  // img: z.string().url(),
})
export type RecipeStep = z.infer<typeof recipeStepSchema>

export const recipeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  categoryId: z.number(),
  authorId: z.string().uuid(),
  img: z.string(),
  // TODO: когда фотки будут загружены на сервер
  // img: z.string().url(),
  time: z.number().positive('Время должно быть больше 0'),
  difficulty: z.number(),
  hidden: z.boolean().optional(),
  status: z.enum(['approved', 'rejected', 'pending']).optional(),
  moderationMessage: z.string().nullish(),
})
export type Recipe = z.infer<typeof recipeSchema>

export const fullRecipeSchema = recipeSchema.extend({
  description: z.string(),
  totalIngredients: z.array(recipeIngredientSchema),
  steps: z.array(recipeStepSchema),
})
export type FullRecipe = z.infer<typeof fullRecipeSchema>

export type RecipeFilters = {
  categories: number[]
  searchQuery?: string
  difficulties: number[]
}

const createRecipeBaseSchema = z.object({
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
  totalIngredients: z.array(recipeIngredientSchema).nonempty('Список ингредиентов пуст'),
  steps: z.array(recipeStepSchema).nonempty('Не указаны шаги приготовления рецепта'),
  hidden: z.boolean(),
})

export const createRecipeDTOSchema = createRecipeBaseSchema.refine(
  data =>
    data.totalIngredients.length ===
    data.steps.reduce((sum, current) => sum + current.ingredients.length, 0),
  {
    message: 'Распределите все указанные ингредиенты по шагам рецепта',
    path: ['totalIngredients'],
  },
)
export type CreateRecipeDTO = z.infer<typeof createRecipeDTOSchema>

export const updateRecipeDTOSchema = createRecipeBaseSchema
  .merge(recipeSchema.pick({ id: true }))
  .refine(
    data =>
      data.totalIngredients.length ===
      data.steps.reduce((sum, current) => sum + current.ingredients.length, 0),
    {
      message: 'Распределите все указанные ингредиенты по шагам рецепта',
      path: ['totalIngredients'],
    },
  )
export type UpdateRecipeDTO = z.infer<typeof updateRecipeDTOSchema>

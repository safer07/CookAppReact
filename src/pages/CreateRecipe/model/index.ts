import { z } from 'zod'

import { Ingredient, ingredientSchema, RecipeStep, recipeStepSchema } from '@/entities/recipe/model'

export const createRecipeDTOSchema = z.object({
  name: z.string({ required_error: 'Введите название рецепта' }),
  category: z.string({ required_error: 'Выберите категорию рецепта' }),
  // TODO: когда категории будут в БД
  // category: z.string().refine((value) => {
  //   return mongoose.Types.ObjectId.isValid(value)
  // }),
  img: z.string({ required_error: 'Не выбрано главное изображение рецепта' }),
  // TODO: когда фотки будут загружены на сервер
  // img: z.string().url(),
  time: z
    .number({ required_error: 'Укажите время приготовления рецепта' })
    .positive('Время должно быть больше 0')
    .step(1),
  difficulty: z.number({ required_error: 'Укажите сложность рецепта' }),
  description: z.string({ required_error: 'Введите описание рецепта' }),
  totalIngredients: z.array(ingredientSchema).nonempty('Список ингредиентов пуст'),
  steps: z.array(recipeStepSchema).nonempty('Не указаны шаги приготовления рецепта'),
  hidden: z.boolean(),
})
export type CreateRecipeDTO = z.infer<typeof createRecipeDTOSchema>

export type CreateRecipeStatus = 'init' | 'loading' | 'error' | 'success'

export type CreateRecipeStore = {
  recipeData: {
    name: string
    category: string
    img: string
    time: number | null
    difficulty: number
    description: string
    totalIngredients: Ingredient[]
    steps: RecipeStep[]
    hidden: boolean
  }

  setName: (value: string) => void
  setCategory: (value: string) => void
  setImg: (value: string) => void
  setTime: (value: number) => void
  setDifficulty: (value: number) => void
  setDescription: (value: string) => void
  setTotalIngredients: (value: Ingredient[]) => void
  setSteps: (value: RecipeStep[]) => void
  setHidden: (value: boolean) => void
  resetCreateRecipe: () => void
}

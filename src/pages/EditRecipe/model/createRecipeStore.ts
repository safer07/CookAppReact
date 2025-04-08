import type { FullRecipe, Ingredient, RecipeStep } from '@/entities/recipe'

import { CustomError, HttpStatus } from '@/shared/model'

export type CreateRecipeStoreState = {
  recipe: {
    name: string
    categoryId: number
    img: string
    time: number | null
    difficulty: number
    description: string
    totalIngredients: Ingredient[]
    steps: RecipeStep[]
    hidden: boolean
  }
  status: HttpStatus
  error: CustomError

  fetchRecipe: () => void
  saveRecipe: () => Promise<FullRecipe>
  setName: (value: string) => void
  setCategoryId: (value: string) => void
  setImg: (value: string) => void
  setTime: (value: number) => void
  setDifficulty: (value: number) => void
  setDescription: (value: string) => void
  setTotalIngredients: (value: Ingredient[]) => void
  setSteps: (value: RecipeStep[]) => void
  setHidden: (value: boolean) => void
  setError: (value: CustomError) => void
  resetCreateRecipe: () => void
}

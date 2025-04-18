import type { Ingredient, RecipeStep } from '@/entities/recipe'

export type EditRecipeStoreState = {
  recipe: {
    id: string
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

  fetchRecipe: (id: string) => Promise<void>
  setName: (value: string) => void
  setCategoryId: (value: string) => void
  setImg: (value: string) => void
  setTime: (value: number) => void
  setDifficulty: (value: number) => void
  setDescription: (value: string) => void
  setTotalIngredients: (value: Ingredient[]) => void
  setSteps: (value: RecipeStep[]) => void
  setHidden: (value: boolean) => void
}

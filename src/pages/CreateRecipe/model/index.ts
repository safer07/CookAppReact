export type CreateRecipeStore = {
  name: string
  category: string
  img: string
  time: number | null
  difficulty: number
  description: string
  totalIngredients: Ingredient[]
  steps: RecipeStep[]
  hidden: boolean

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

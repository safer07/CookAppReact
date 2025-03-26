import { CreateRecipeDTO } from '@/entities/recipe/model/recipe'

export default function allIngredientsDistributed(recipe: CreateRecipeDTO) {
  const distributedIngredients = recipe.steps.reduce(
    (sum, current) => sum + current.ingredients.length,
    0,
  )
  return recipe.totalIngredients.length === distributedIngredients
}

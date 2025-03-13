import { RecipeCategory } from '../model/recipeCategory'

export function findCategoryById(id: number, categories: RecipeCategory[]) {
  return categories.find(category => category.id === id)
}

import { RecipeCategory } from '../model/recipe-category'

export function findCategoryById(id: number, categories: RecipeCategory[]) {
  return categories.find(category => category.id === id)
}

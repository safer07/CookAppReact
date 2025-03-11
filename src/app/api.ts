import { type RecipeCategory, categories } from '@/entities/recipeCategory/const/categories'

// TODO: удалить файл
export function fetchCategories() {
  return new Promise<RecipeCategory[]>(resolve => {
    setTimeout(() => {
      resolve(categories)
    }, 100)
  })
}

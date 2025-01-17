import { categories } from '@/entities/recipeCategory/const/categories'

export function fetchCategories() {
  return new Promise<IRecipeCategoryItem[]>((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 100)
  })
}

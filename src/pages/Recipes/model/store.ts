import type { Recipe, RecipeFilters } from '@/entities/recipe'
import type { HttpStatus } from '@/shared/model'

export type RecipesStore = {
  items: Recipe[]
  status: HttpStatus
  filters: RecipeFilters
  fetchRecipes: (filters?: RecipeFilters) => Promise<void>
  setCategories: (categories: string[]) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

import { Recipe, RecipesFilters } from '@/entities/recipe/model'

export type RecipesStatus = 'init' | 'loading' | 'success' | 'error'

export type RecipesStore = {
  items: Recipe[]
  status: RecipesStatus
  filters: RecipesFilters
  fetchRecipes: (filters?: RecipesFilters) => Promise<void>
  setCategories: (categories: string[]) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

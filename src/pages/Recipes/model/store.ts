import { Recipe, RecipesFilters } from '@/entities/recipe/model'

export type RecipesStatus = 'init' | 'loading' | 'success' | 'error'

export type RecipesStore = {
  items: Recipe[]
  status: RecipesStatus
  filters: RecipesFilters
  fetchRecipes: (filters?: RecipesFilters) => Promise<void>
  // TODO: устанавливать не id, а категории
  setCategoryId: (id: string | null) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

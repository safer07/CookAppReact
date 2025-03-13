import type { Recipe, RecipeFilters } from '@/entities/recipe'

import type { HttpStatus } from '@/shared/model'

export type CatalogStore = {
  items: Recipe[]
  status: HttpStatus
  filters: RecipeFilters
  fetchRecipes: (filters?: RecipeFilters) => Promise<void>
  setFilteredCategories: (categories: number[]) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

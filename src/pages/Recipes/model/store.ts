import type { RecipeFilters } from '@/entities/recipe'

export type CatalogStore = {
  filters: RecipeFilters
  setFilteredCategories: (categories: number[]) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

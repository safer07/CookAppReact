import type { RecipeFilters } from '@/entities/recipe'

export type CatalogStore = {
  filters: RecipeFilters
  setCategories: (categories: number[]) => void
  setSearchQuery: (query: string) => void
  setDifficulties: (difficulties: number[]) => void
  resetFilters: () => void
}

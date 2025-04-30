import type { RecipeFilters } from '@/entities/recipe'

export function getFiltersCount(filters: RecipeFilters): number {
  return Object.values(filters).filter(value => value.length !== 0).length
}

import type { TagSurface } from '@/shared/ui/tag'

import { RECIPE_STATUSES } from '../const/recipe-statuses'

export function getRecipeStatusTagSurface(
  value: (typeof RECIPE_STATUSES)[number]['value'],
): TagSurface {
  return RECIPE_STATUSES.find(item => item.value === value)?.tagSurface ?? 'surface-red'
}

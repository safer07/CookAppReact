import { RECIPE_STATUSES } from '@/entities/recipe'

export const STATUS_OPTIONS = Object.keys(RECIPE_STATUSES).map(key => ({
  label: RECIPE_STATUSES[key as keyof typeof RECIPE_STATUSES],
  value: key,
}))

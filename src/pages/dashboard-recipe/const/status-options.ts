import { RECIPE_STATUSES } from '@/entities/recipe'

export const STATUS_OPTIONS = RECIPE_STATUSES.map(status => ({
  label: status.text,
  value: status.value,
}))

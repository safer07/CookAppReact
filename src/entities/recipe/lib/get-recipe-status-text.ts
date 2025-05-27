import { RECIPE_STATUSES } from '../const/recipe-statuses'

export function getRecipeStatusText(value: (typeof RECIPE_STATUSES)[number]['value']) {
  return RECIPE_STATUSES.find(item => item.value === value)?.text ?? '???'
}

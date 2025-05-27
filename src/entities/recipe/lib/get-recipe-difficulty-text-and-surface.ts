import { TagSurface } from '@/shared/ui/tag'

import { RECIPE_DIFFICULTIES } from '../const/recipe-difficulties'

export function getRecipeDifficultyTextAndSurface(
  recipeDifficulty: number | undefined,
): [string, TagSurface] {
  const difficultyItem = RECIPE_DIFFICULTIES.find(item => item.value === recipeDifficulty)

  const difficultyText = difficultyItem?.text ?? '???'
  const tagDifficultySurface = difficultyItem?.tagSurface ?? 'surface-red'

  return [difficultyText, tagDifficultySurface]
}

import { TagSurface } from '@/shared/ui/Tag'

import { RECIPE_DIFFICULTIES } from '../const/recipeDifficulties'

export function getRecipeDifficultyTextAndSurface(
  recipeDifficulty: number | undefined,
): [string, TagSurface] {
  const difficultyItem = RECIPE_DIFFICULTIES.find(item => item.value === recipeDifficulty)

  const difficultyText = difficultyItem?.difficultyText ?? '???'
  const tagDifficultySurface = difficultyItem?.tagDifficultySurface ?? 'surface-red'

  return [difficultyText, tagDifficultySurface]
}

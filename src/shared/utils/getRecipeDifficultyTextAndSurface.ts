import { errorRecipeDifficulty, recipeDifficulties } from '@/entities/recipe'
import { TagSurface } from '../ui/Tag'

export function getRecipeDifficultyTextAndSurface(
  recipeDifficulty: number | undefined,
): [string, TagSurface] {
  const difficultyItem = recipeDifficulties.find((item) => item.value === recipeDifficulty)

  let difficultyText, tagDifficultySurface

  if (difficultyItem) {
    difficultyText = difficultyItem.difficultyText
    tagDifficultySurface = difficultyItem.tagDifficultySurface
  } else {
    difficultyText = errorRecipeDifficulty.difficultyText
    tagDifficultySurface = errorRecipeDifficulty.tagDifficultySurface
  }

  return [difficultyText, tagDifficultySurface]
}

import type { TagSurface } from '@/shared/ui/Tag'

type RecipeDifficultyItem = {
  value: number
  difficultyText: string
  description: string
  tagDifficultySurface: TagSurface
}

export const RECIPE_DIFFICULTIES: RecipeDifficultyItem[] = [
  {
    value: 1,
    difficultyText: 'Легко',
    description: 'Справится даже ребёнок',
    tagDifficultySurface: 'surface-green',
  },
  {
    value: 2,
    difficultyText: 'Средне',
    description: 'Может не получиться с первого раза',
    tagDifficultySurface: 'surface-yellow',
  },
  {
    value: 3,
    difficultyText: 'Трудно',
    description: 'Требуется большой кулинарный опыт',
    tagDifficultySurface: 'surface-red',
  },
]

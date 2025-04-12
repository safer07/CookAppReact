import type { TagSurface } from '@/shared/ui/Tag'

type RecipeDifficultyItem = {
  value: number
  text: string
  description: string
  tagDifficultySurface: TagSurface
}

export const RECIPE_DIFFICULTIES: RecipeDifficultyItem[] = [
  {
    value: 1,
    text: 'Легко',
    description: 'Справится даже ребёнок',
    tagDifficultySurface: 'surface-green',
  },
  {
    value: 2,
    text: 'Средне',
    description: 'Может не получиться с первого раза',
    tagDifficultySurface: 'surface-yellow',
  },
  {
    value: 3,
    text: 'Трудно',
    description: 'Требуется большой кулинарный опыт',
    tagDifficultySurface: 'surface-red',
  },
]

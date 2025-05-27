import type { TagSurface } from '@/shared/ui/tag'

type RecipeDifficultyItem = {
  value: number
  text: string
  description: string
  tagSurface: TagSurface
}

export const RECIPE_DIFFICULTIES: RecipeDifficultyItem[] = [
  {
    value: 1,
    text: 'Легко',
    description: 'Справится даже ребёнок',
    tagSurface: 'surface-green',
  },
  {
    value: 2,
    text: 'Средне',
    description: 'Может не получиться с первого раза',
    tagSurface: 'surface-yellow',
  },
  {
    value: 3,
    text: 'Трудно',
    description: 'Требуется большой кулинарный опыт',
    tagSurface: 'surface-red',
  },
] as const

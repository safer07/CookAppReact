export const RECIPE_STATUSES = [
  {
    value: 'approved',
    text: 'Подтверждён',
    tagSurface: 'surface-green',
  },
  {
    value: 'pending',
    text: 'На проверке',
    tagSurface: 'surface-yellow',
  },
  {
    value: 'rejected',
    text: 'Отклонён',
    tagSurface: 'surface-red',
  },
] as const

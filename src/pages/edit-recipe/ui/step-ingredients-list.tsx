import { getIngredientNameByUnitId, getUnitNameByUnitId } from '@/entities/recipe'
import type { Ingredient, RecipeIngredient } from '@/entities/recipe'

import ListItem from '@/shared/ui/list-item'

interface StepIngredientsListProps {
  ingredients: RecipeIngredient[]
  allIngredients: Ingredient[]
  onDelete: (unitId: number) => void
}

export const StepIngredientsList = ({
  ingredients,
  allIngredients,
  onDelete,
}: StepIngredientsListProps) => (
  <ul className="layout-wide">
    {ingredients.map(i => (
      <ListItem
        key={i.unitId}
        text={getIngredientNameByUnitId(i.unitId, allIngredients) ?? '???'}
        secondaryText={`${i.amount} ${getUnitNameByUnitId(i.unitId, allIngredients) ?? '???'}`}
        size="medium"
        rightElement={{
          element: 'delete',
          onClick: () => onDelete(i.unitId),
        }}
      />
    ))}
  </ul>
)

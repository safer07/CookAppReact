import { Ingredient } from '../model/ingredient'

export function getIngredientNameByUnitId(id: number, ingredients: Ingredient[]) {
  return ingredients?.find(ingredient => ingredient.units.find(unit => unit.id === id))?.name
}

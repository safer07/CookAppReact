import type { Ingredient } from '../model/ingredient'

export function getUnitNameByUnitId(id: number, ingredients: Ingredient[]): string | undefined {
  let unitName: string | undefined
  ingredients?.find(ingredient => (unitName = ingredient.units.find(unit => unit.id === id)?.name))
  return unitName
}

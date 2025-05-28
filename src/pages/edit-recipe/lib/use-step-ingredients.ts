import { useEffect, useState } from 'react'

import type { RecipeIngredient, RecipeStep } from '@/entities/recipe'

export const useStepIngredients = (
  currentStepIndex: number,
  steps: RecipeStep[],
  totalIngredients: RecipeIngredient[],
  onStepsUpdate: (newSteps: RecipeStep[]) => void,
) => {
  const [currentStepUnitIds, setCurrentStepUnitIds] = useState<string[]>([])

  function deleteIngredient(deletedIngredientUnitId: number): void {
    setCurrentStepUnitIds(prev => prev.filter(i => i !== String(deletedIngredientUnitId)))
  }

  // Обновление ингредиентов шага
  useEffect(() => {
    const stepUnitIds: string[] =
      steps[currentStepIndex]?.ingredients.map((i: RecipeIngredient) => String(i.unitId)) || []
    setCurrentStepUnitIds(stepUnitIds)
  }, [currentStepIndex, steps.length])

  // Синхронизация выбранных ингредиентов с состоянием
  useEffect(() => {
    // Нужно копировать массив и всё внутри него, так как нельзя использовать изначальные значения
    const newSteps = structuredClone(steps)
    const filteredIngredients = totalIngredients.filter(i =>
      currentStepUnitIds.includes(String(i.unitId)),
    )
    newSteps[currentStepIndex].ingredients = filteredIngredients
    onStepsUpdate(newSteps)
  }, [currentStepUnitIds])

  return {
    currentStepUnitIds,
    setCurrentStepUnitIds,
    deleteIngredient,
  }
}

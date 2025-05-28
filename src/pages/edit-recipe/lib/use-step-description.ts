import { useEffect, useState } from 'react'

import type { RecipeStep } from '@/entities/recipe'

export const useStepDescription = (
  currentStepIndex: number,
  steps: RecipeStep[],
  onStepUpdate: (value: string, field: 'img' | 'description') => void,
) => {
  const [inputStepDescription, setInputStepDescription] = useState(
    steps[currentStepIndex]?.description || '',
  )

  useEffect(() => {
    setInputStepDescription(steps[currentStepIndex]?.description || '')
  }, [currentStepIndex, steps])

  useEffect(() => {
    onStepUpdate(inputStepDescription, 'description')
  }, [inputStepDescription])

  return {
    inputStepDescription,
    setInputStepDescription,
  }
}

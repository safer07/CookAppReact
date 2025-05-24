import { useEffect, useState } from 'react'

import {
  RECIPE_LIMITS,
  RecipeIngredient,
  getIngredientNameByUnitId,
  getUnitNameByUnitId,
  useIngredients,
} from '@/entities/recipe'

import { useConfirm } from '@/shared/lib'
import ButtonIcon from '@/shared/ui/button-icon'
import ListItem from '@/shared/ui/list-item'
import PhotoUpload from '@/shared/ui/photo-upload'
import Select, { type SelectOption } from '@/shared/ui/select'
import Stepper from '@/shared/ui/stepper'
import Textarea from '@/shared/ui/textarea'

import type { CreateRecipeStore } from '../store/create-recipe-store'
import { type EditRecipeStore, emptyStep } from '../store/edit-recipe-store'

type StepProps = {
  store: CreateRecipeStore | EditRecipeStore
}

const confirmDeleteProps = {
  okText: 'Удалить',
  title: 'Удалить шаг рецепта?',
  text: 'В удаляемом шаге рецепта есть заполненные поля. Удалить этот рецепта? Все внесённые данные будут утеряны.',
}

export default function Step4({ store }: StepProps): React.JSX.Element {
  const { recipe, setSteps, setHidden } = store()
  const { totalIngredients, steps, hidden } = recipe
  const { ingredients } = useIngredients()
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [currentStepUnitIds, setCurrentStepUnitIds] = useState<string[]>([])
  const [inputStepDescription, setInputStepDescription] = useState<string>('')
  const [ConfirmDeleteStepModal, confirmDelete] = useConfirm(confirmDeleteProps)

  const currentStepIngredients: RecipeIngredient[] = steps[currentStepIndex]?.ingredients

  const ingredientsOptions: SelectOption[] = totalIngredients.map((ingredient): SelectOption => {
    const usedIngredient: boolean = stepsHasIngredient(ingredient.unitId)
    const selected = currentStepUnitIds.includes(String(ingredient.unitId))
    const disabled = usedIngredient && !selected

    return {
      value: String(ingredient.unitId),
      label: getIngredientNameByUnitId(ingredient.unitId, ingredients) ?? '',
      secondaryText: `${ingredient.amount} ${getUnitNameByUnitId(ingredient.unitId, ingredients)}`,
      selected,
      disabled,
      description: usedIngredient ? `Шаг ${findStepWithIngredient(ingredient.unitId)}` : '',
    }
  })

  function setStepValue(value: string, field: 'img' | 'description'): void {
    const newSteps = structuredClone(steps)
    newSteps[currentStepIndex][field] = value
    setSteps(newSteps)
  }

  function deleteStep(): void {
    const newSteps = steps.filter((_, index) => index !== currentStepIndex)
    setSteps(newSteps)
    if (currentStepIndex !== 0) setCurrentStepIndex(prev => prev - 1)
  }

  function stepsHasIngredient(unitId: number): boolean {
    return steps.some((step): boolean => step.ingredients.some(i => i.unitId === unitId))
  }

  function findStepWithIngredient(unitId: number): number {
    return steps.findIndex(step => step.ingredients.some(i => i.unitId === unitId)) + 1
  }

  function stepIsEmpty(): boolean {
    if (
      !currentStepIngredients.length &&
      !steps[currentStepIndex].img &&
      !steps[currentStepIndex].description
    ) {
      return true
    } else return false
  }

  async function onClickDeleteStep(): Promise<void> {
    if (!stepIsEmpty()) {
      const ok = await confirmDelete()
      if (!ok) return
    }
    deleteStep()
  }

  function deleteIngredient(deletedIngredientUnitId: number): void {
    setCurrentStepUnitIds(prev => prev.filter(i => i !== String(deletedIngredientUnitId)))
  }

  useEffect(() => {
    setStepValue(inputStepDescription, 'description')
  }, [inputStepDescription])

  useEffect(() => {
    setInputStepDescription(steps[currentStepIndex].description)
  }, [currentStepIndex, steps])

  useEffect(() => {
    const stepUnitIds: string[] = steps[currentStepIndex].ingredients.map(i => String(i.unitId))

    setCurrentStepUnitIds(stepUnitIds)
  }, [currentStepIndex, steps.length])

  useEffect(() => {
    // Нужно копировать массив и всё внутри него, так как нельзя использовать изначальные значения
    const newSteps = structuredClone(steps)
    const filteredIngredients = totalIngredients.filter(i =>
      currentStepUnitIds.includes(String(i.unitId)),
    )
    newSteps[currentStepIndex].ingredients = filteredIngredients
    setSteps(newSteps)
  }, [currentStepUnitIds])

  return (
    <>
      <form className="layout-grid flex flex-col gap-3">
        <div>
          <p className="headline-medium mb-2">Добавить шаги приготовления</p>
          <Stepper
            currentIndex={currentStepIndex}
            stepsCount={steps.length}
            type="big"
            setStep={setCurrentStepIndex}
            createStep={() => setSteps([...steps, emptyStep])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-6 items-center justify-between gap-2">
            <h2 className="headline-medium">Шаг {currentStepIndex + 1}</h2>
            {steps.length > 1 && (
              <ButtonIcon
                icon="delete"
                onClick={onClickDeleteStep}
                variant="tertiary"
                ariaLabel="Удалить ингредиент"
              />
            )}
          </div>
          <h3 className="headline-small">Ингредиенты в шаге</h3>

          <Select
            value={currentStepUnitIds}
            options={ingredientsOptions}
            onChange={value => setCurrentStepUnitIds(value)}
            label={`Ингредиенты (шаг ${currentStepIndex + 1})`}
            placeholder="Выберите ингредиенты"
            multiple
            optionSize="medium"
          />

          {currentStepIngredients.length > 0 && (
            <ul className="layout-wide">
              {currentStepIngredients.map(i => (
                <ListItem
                  key={i.unitId}
                  text={getIngredientNameByUnitId(i.unitId, ingredients) ?? '???'}
                  secondaryText={`${i.amount} ${getUnitNameByUnitId(i.unitId, ingredients) ?? '???'}`}
                  size="medium"
                  rightElement={{
                    element: 'delete',
                    onClick: () => deleteIngredient(i.unitId),
                  }}
                />
              ))}
            </ul>
          )}
        </div>

        <Textarea
          value={inputStepDescription}
          onChange={value => setInputStepDescription(value)}
          label={`Рецепт (шаг ${currentStepIndex + 1})`}
          showCount
          maxLength={RECIPE_LIMITS.stepDescription.max}
        />

        <PhotoUpload
          image={steps[currentStepIndex].img}
          onChange={value => setStepValue(value, 'img')}
          label={`Фото (шаг ${currentStepIndex + 1})`}
        />
      </form>

      <ul className="layout-wide mt-2">
        <ListItem
          text="Опубликовать рецепт"
          size="medium"
          leftElement={{
            element: 'switch',
            checked: !hidden,
            onClick: () => setHidden(!hidden),
          }}
        />
      </ul>

      <ConfirmDeleteStepModal />
    </>
  )
}

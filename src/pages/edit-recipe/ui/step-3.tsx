import { useEffect, useState } from 'react'

import { getIngredientNameByUnitId, getUnitNameByUnitId, useIngredients } from '@/entities/recipe'
import type { RecipeIngredient } from '@/entities/recipe'

import Button from '@/shared/ui/button'
import Input from '@/shared/ui/input'
import ListItem from '@/shared/ui/list-item'
import Modal from '@/shared/ui/modal'
import Select from '@/shared/ui/select'

import type { CreateRecipeStore } from '../store/create-recipe-store'
import type { EditRecipeStore } from '../store/edit-recipe-store'

type StepProps = {
  setStepIsValid: (status: boolean) => void
  store: CreateRecipeStore | EditRecipeStore
}

export default function Step3({ setStepIsValid, store }: StepProps): React.JSX.Element {
  const { recipe, setSteps, setTotalIngredients } = store()
  const { steps, totalIngredients } = recipe
  const { ingredients } = useIngredients()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [newIngredientName, setNewIngredientName] = useState<string>('')
  const [newIngredientAmount, setNewIngredientAmount] = useState<number>(0)
  const [newIngredientUnit, setNewIngredientUnit] = useState<string>('')

  const ingredientOptions = ingredients.map(ingredient => ({
    label: ingredient.name,
    value: ingredient.name,
  }))

  const ingredientUnitOptions =
    ingredients
      .find(ingredient => ingredient.name === newIngredientName)
      ?.units.map(unit => ({
        label: unit.name,
        value: String(unit.id),
      })) ?? []

  function onAddIngredient(): void {
    const newIngredient: RecipeIngredient = {
      amount: newIngredientAmount,
      unitId: +newIngredientUnit,
    }

    if (
      !newIngredientName ||
      !newIngredientAmount ||
      !newIngredientUnit ||
      totalIngredients.some(ingredient => ingredient.unitId === +newIngredientUnit)
    ) {
      return
    }

    setTotalIngredients([...totalIngredients, newIngredient])
    setNewIngredientName('')
    setNewIngredientAmount(0)
    setNewIngredientUnit('')
  }

  function deleteIngredient(deletedIngredient: RecipeIngredient): void {
    const newTotalIngredients: RecipeIngredient[] = totalIngredients.filter(
      ingredient => ingredient !== deletedIngredient,
    )
    steps.forEach(step => {
      step.ingredients = step.ingredients.filter(
        ingredient => ingredient.unitId !== deletedIngredient.unitId,
      )
    })

    setSteps(steps)
    setTotalIngredients(newTotalIngredients)
  }

  useEffect(() => {
    if (totalIngredients.length > 0) setStepIsValid(true)
    else setStepIsValid(false)
  }, [totalIngredients, setStepIsValid])

  return (
    <>
      <form className="space-y-3">
        <h2 className="headline-medium">Ингредиенты</h2>

        {totalIngredients.length > 0 && (
          <ul className="layout-wide">
            {totalIngredients.map(i => (
              <ListItem
                key={i.unitId}
                text={getIngredientNameByUnitId(i.unitId, ingredients) ?? '???'}
                secondaryText={`${i.amount} ${getUnitNameByUnitId(i.unitId, ingredients) ?? '???'}`}
                size="medium"
                rightElement={{
                  element: 'delete',
                  onClick: () => deleteIngredient(i),
                }}
              />
            ))}
          </ul>
        )}

        <Button
          text="Добавить ингредиент"
          icon="plus"
          onClick={() => setModalIsOpen(true)}
          fullWidth
        />
      </form>

      <Modal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        onOk={onAddIngredient}
        okText="Добавить"
        title="Добавить ингредиент"
        textAlign="left"
        cancellable
      >
        <div className="mt-2">
          <Select
            value={newIngredientName}
            onChange={value => setNewIngredientName(value)}
            options={ingredientOptions}
            label="Выберите продукт"
            search
          />
          <div className="mt-2 flex gap-2">
            <Input
              className="grow"
              type="number"
              value={String(newIngredientAmount)}
              onChange={value => setNewIngredientAmount(+value)}
              min="0"
              label="Количество"
            />
            <Select
              className="w-[7.5rem] shrink-0"
              value={newIngredientUnit}
              onChange={value => setNewIngredientUnit(value)}
              options={ingredientUnitOptions}
              label="Ед. измерения"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

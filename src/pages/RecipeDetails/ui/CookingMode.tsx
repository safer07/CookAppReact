import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import { getIngredientNameByUnitId, getUnitNameByUnitId, useIngredients } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import Button from '@/shared/ui/Button'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Image from '@/shared/ui/Image'
import ListItem from '@/shared/ui/ListItem'
import Loader from '@/shared/ui/Loader'
import Stepper from '@/shared/ui/Stepper'

import { useFullRecipe } from '../lib/useFullRecipe'

export default function CookingMode(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ingredients } = useIngredients()
  const { recipe, error: fetchError, isPending, isError } = useFullRecipe(id)
  const error = catchHttpError(fetchError)
  const [stepIndex, setStepIndex] = useState<number>(0)
  const stepsCount = recipe?.steps.length || 1
  const step = recipe?.steps[stepIndex]

  function navigateToRecipe() {
    navigate(`/recipes/${id}`, { replace: true })
  }

  function onClickBack() {
    if (stepIndex === 0) navigateToRecipe()
    else setStepIndex(prev => prev - 1)
  }

  function onClickNext() {
    if (stepIndex === stepsCount - 1) navigateToRecipe()
    else setStepIndex(prev => prev + 1)
  }

  return (
    <>
      {isPending && (
        <div className="h-svh">
          <Loader />
        </div>
      )}

      {isError && (
        <>
          <TopAppBar title="Не удалось загрузить рецепт" back />
          <ErrorComponent className="mt-1" error={error} />
        </>
      )}

      {!isError && step && (
        <div className="layout-fullwidth h-svh grid-rows-[1fr_auto]">
          <div className="mobile-no-scroll layout-wide overflow-y-auto">
            <div className="relative aspect-9/7 min-h-[4.5rem]">
              <Image
                className="aspect-9/7 w-full object-cover"
                src={step.img}
                key={step.img}
                alt={`Шаг ${stepIndex + 1}`}
              />
              <ButtonIcon
                className="absolute top-2 left-2"
                icon="cross"
                onClick={() => navigateToRecipe()}
                size="small"
                ariaLabel="Закрыть режим приготовления"
              />
            </div>
            <div className="layout-grid">
              <div className="grid gap-2 py-2">
                <h1 className="headline-large text-center">Шаг {stepIndex + 1}</h1>
                <Stepper
                  stepsCount={stepsCount}
                  currentIndex={stepIndex}
                  setStep={setStepIndex}
                  type="medium"
                />
                {step.ingredients.length > 0 && (
                  <ul className="layout-wide">
                    {step.ingredients.map((item, index) => (
                      <ListItem
                        key={index}
                        size="small"
                        text={getIngredientNameByUnitId(item.unitId, ingredients) ?? '???'}
                        secondaryText={`${item.amount} ${getUnitNameByUnitId(item.unitId, ingredients) ?? '???'}`}
                      />
                    ))}
                  </ul>
                )}
                <p className="text-txt-main">{step.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
            <Button text="Назад" onClick={onClickBack} fullWidth />
            <Button
              text={stepIndex !== stepsCount - 1 ? 'Далее' : 'Готово'}
              onClick={onClickNext}
              variant="primary"
              fullWidth
            />
          </div>
        </div>
      )}
    </>
  )
}

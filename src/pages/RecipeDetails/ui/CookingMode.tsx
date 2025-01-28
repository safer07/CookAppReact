import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useFullRecipe from '../store/store'
import TopAppBar from '@/widgets/TopAppBar'
import Button from '@/shared/ui/Button'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import ListItem from '@/shared/ui/ListItem'
import Loader from '@/shared/ui/Loader'
import Stepper from '@/shared/ui/Stepper'
import ErrorComponent from '@/shared/ui/ErrorComponent'

export default function CookingMode(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { recipe, status, error, fetchFullRecipe } = useFullRecipe()
  const [stepIndex, setStepIndex] = useState<number>(0)
  const stepsCount = recipe?.steps.length || 1
  const step = recipe?.steps[stepIndex]

  useEffect(() => {
    if (!id || recipe?._id === id) return
    fetchFullRecipe(id)
  }, [id])

  function navigateToRecipe() {
    navigate(`/recipes/${id}`, { replace: true })
  }

  function onClickBack() {
    if (stepIndex === 0) navigateToRecipe()
    else setStepIndex((prev) => prev - 1)
  }

  function onClickNext() {
    if (stepIndex === stepsCount - 1) navigateToRecipe()
    else setStepIndex((prev) => prev + 1)
  }

  return (
    <>
      {status === 'loading' && (
        <div className="h-svh">
          <Loader />
        </div>
      )}

      {status === 'error' && (
        <>
          <TopAppBar title="Не удалось загрузить рецепт" back />
          <ErrorComponent className="mt-1" error={error} />
        </>
      )}

      {status === 'success' && step && (
        <div className="layout-fullwidth flex h-svh flex-col">
          <div className="grow overflow-y-auto">
            <div className="relative min-h-[4.5rem]">
              <img
                className="aspect-[9/7] w-full object-cover"
                src={step.img}
                alt={`Шаг ${stepIndex + 1}`}
              />
              <ButtonIcon
                className="absolute left-2 top-2"
                icon="cross"
                onClick={() => navigateToRecipe()}
                size="small"
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
                  <ul className="layout-fullwidth">
                    {step.ingredients.map((item, index) => (
                      <ListItem
                        key={index}
                        size="small"
                        text={item.name}
                        secondaryText={`${item.amount} ${item.unit}`}
                      />
                    ))}
                  </ul>
                )}
                <p className="text-primary-color">{step.description}</p>
              </div>
            </div>
          </div>
          <div className="layout-grid">
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
        </div>
      )}
    </>
  )
}

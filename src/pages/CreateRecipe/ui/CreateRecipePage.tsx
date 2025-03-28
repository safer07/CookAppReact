import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import { createRecipeDTOSchema, recipesService } from '@/entities/recipe'

import { API_PATHS } from '@/shared/config'
import { catchHttpError, formatZodError, navigateBack } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import { RECIPES_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Modal from '@/shared/ui/Modal'
import Stepper from '@/shared/ui/Stepper'

import { useCreateRecipe } from '../store/createRecipeStore'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

export default function CreateRecipePage(): React.JSX.Element {
  const navigate = useNavigate()
  const { recipeData, resetCreateRecipe } = useCreateRecipe()
  const [step, setStep] = useState<number>(1)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false)
  const [stepIsValid, setStepIsValid] = useState<boolean>(false)
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  const stepsCount = 4

  function onClickBack(): void {
    if (step === 1) navigateBack(navigate)
    else setStep(prev => prev - 1)
  }

  function onClickNext(): void {
    if (step === stepsCount) onSubmit()
    else setStep(prev => prev + 1)
  }

  function onDelete(): void {
    resetCreateRecipe()
    navigate(RECIPES_ROUTE)
  }

  async function onSubmit() {
    setError(null)

    const result = createRecipeDTOSchema.safeParse(recipeData)
    if (result.success) {
      try {
        setError(null)
        setStatus('loading')
        const response = await recipesService.create(result.data)
        setStatus('success')
        resetCreateRecipe()
        navigate(`${API_PATHS.recipes.getOne}/${response.recipe.id}`, { replace: true })
        toast.success('Рецепт создан')
      } catch (error) {
        setStatus('error')
        catchHttpError(error, setError)
      }
    } else {
      setError({
        errors: formatZodError(result),
      })
    }
  }

  useEffect(() => {
    setError(null)
  }, [step])

  return (
    <div className="flex h-svh flex-col">
      <TopAppBar
        title="Создать рецепт"
        back
        backOnClick={onClickBack}
        rightIcon={{
          icon: 'delete',
          onClick: () => setModalDeleteIsOpen(true),
        }}
      />

      <Stepper stepsCount={stepsCount} currentIndex={step - 1} type="simple" />

      <div className="layout-fullwidth mt-3 grow overflow-y-auto pb-2">
        {step === 1 && <Step1 setStepIsValid={setStepIsValid} />}
        {step === 2 && <Step2 setStepIsValid={setStepIsValid} />}
        {step === 3 && <Step3 setStepIsValid={setStepIsValid} />}
        {step === 4 && <Step4 />}
        <ErrorComponent className="layout-grid mt-3" error={error} />
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
        <Button text="Назад" onClick={onClickBack} fullWidth />
        <Button
          text={step !== stepsCount ? 'Далее' : 'Сохранить'}
          onClick={onClickNext}
          variant="primary"
          fullWidth
          disabled={!stepIsValid || status === 'loading'}
        />
      </div>

      <Modal
        open={modalDeleteIsOpen}
        setOpen={setModalDeleteIsOpen}
        onOk={onDelete}
        okText="Удалить"
        title="Удалить рецепт?"
        text="Очистить поля рецепта? Все внесённые данные будут утеряны."
        type="negative"
        cancellable
      />
    </div>
  )
}

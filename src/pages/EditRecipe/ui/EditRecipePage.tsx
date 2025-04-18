import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import { navigateBack } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import { CREATE_RECIPE_ROUTE, RECIPES_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Modal from '@/shared/ui/Modal'
import Stepper from '@/shared/ui/Stepper'

import { useCreateRecipe } from '../lib/useCreateRecipe'
import { useUpdateRecipe } from '../lib/useUpdateRecipe'
import { createRecipeStore } from '../store/createRecipeStore'
import { editRecipeStore } from '../store/editRecipeStore'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

export default function EditRecipePage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = location.pathname !== CREATE_RECIPE_ROUTE
  const [error, setFormError] = useState<CustomError>(null)
  const { mutateAsync: createRecipe, isPending: isCreatePending } = useCreateRecipe(setFormError)
  const { mutateAsync: updateRecipe, isPending: isUpdatePending } = useUpdateRecipe(setFormError)
  const resetRecipe = createRecipeStore().resetRecipe
  const fetchRecipe = editRecipeStore().fetchRecipe
  const [step, setStep] = useState<number>(1)
  const [stepIsValid, setStepIsValid] = useState<boolean>(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false)
  const isLoading = isCreatePending || isUpdatePending
  const stepsCount = 4

  function onClickBack(): void {
    if (step === 1) navigateBack(navigate)
    else setStep(prev => prev - 1)
  }

  function onClickNext(): void {
    if (step === stepsCount) {
      if (isEdit) {
        toast.promise(updateRecipe(), {
          loading: 'Загрузка...',
          success: 'Рецепт обновлён',
          error: 'Не удалось обновить рецепт',
        })
      } else {
        toast.promise(createRecipe(), {
          loading: 'Создание рецепта...',
          success: 'Рецепт создан',
          error: 'Не удалось создать рецепт',
        })
      }
    } else setStep(prev => prev + 1)
  }

  function onDelete(): void {
    resetRecipe()
    navigate(RECIPES_ROUTE)
  }

  useEffect(() => {
    if (!isEdit || !id) return
    fetchRecipe(id)
  }, [id, isEdit, fetchRecipe])

  useEffect(() => {
    setFormError(null)
  }, [step, setFormError])

  return (
    <>
      <div className="layout-wide grid h-svh grid-rows-[1fr_auto]">
        <div className="mobile-no-scroll overflow-y-auto">
          <div className="layout-grid">
            <TopAppBar
              title={`${isEdit ? 'Редактировать' : 'Создать'} рецепт`}
              back
              backOnClick={onClickBack}
              rightIcon={
                !isEdit
                  ? {
                      icon: 'delete',
                      onClick: () => setModalDeleteIsOpen(true),
                    }
                  : undefined
              }
            />
            <Stepper stepsCount={stepsCount} currentIndex={step - 1} type="simple" />

            <div className="mt-3 pb-2">
              {step === 1 && (
                <Step1
                  setStepIsValid={setStepIsValid}
                  store={isEdit ? editRecipeStore : createRecipeStore}
                />
              )}
              {step === 2 && (
                <Step2
                  setStepIsValid={setStepIsValid}
                  store={isEdit ? editRecipeStore : createRecipeStore}
                />
              )}
              {step === 3 && (
                <Step3
                  setStepIsValid={setStepIsValid}
                  store={isEdit ? editRecipeStore : createRecipeStore}
                />
              )}
              {step === 4 && <Step4 store={isEdit ? editRecipeStore : createRecipeStore} />}
              <ErrorComponent className="mt-3" error={error} />
            </div>
          </div>
        </div>
        <div className="layout-grid">
          <div className="grid grid-cols-2 gap-2 py-2">
            <Button text="Назад" onClick={onClickBack} fullWidth />
            <Button
              text={step !== stepsCount ? 'Далее' : 'Сохранить'}
              onClick={onClickNext}
              variant="primary"
              fullWidth
              disabled={!stepIsValid || isLoading}
            />
          </div>
        </div>

        {!isEdit && (
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
        )}
      </div>
    </>
  )
}

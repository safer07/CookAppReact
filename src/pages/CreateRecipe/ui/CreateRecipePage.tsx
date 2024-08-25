import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import useCreateRecipe from '../store/store'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import { CreateRecipeErrorResponse, CreateRecipeResponse } from '../model/types'
import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import Stepper from '@/shared/ui/Stepper'
import Button from '@/shared/ui/Button'
import Modal from '@/shared/ui/Modal'
import navigateBack from '@/shared/utils/navigateBack'
import { backendUrl } from '@/shared/config'

export default function CreateRecipePage(): JSX.Element {
  const navigate = useNavigate()
  const { token } = useUser()
  const {
    name,
    category,
    img,
    time,
    difficulty,
    description,
    totalIngredients,
    steps,
    hidden,
    resetCreateRecipe,
  } = useCreateRecipe()
  const [step, setStep] = useState<number>(1)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false)
  const [modalFinishIsOpen, setModalFinishIsOpen] = useState<boolean>(false)
  const [stepIsValid, setStepIsValid] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [recipeId, setRecipeId] = useState<string>('')

  const validationErrors: string[] = []
  const stepsCount = 4

  function onClickBack(): void {
    if (step === 1) navigateBack(navigate)
    else setStep((prev) => prev - 1)
  }

  function onClickNext(): void {
    if (step === stepsCount) onSubmit()
    else setStep((prev) => prev + 1)
  }

  function onDelete(): void {
    resetCreateRecipe()
    navigate('/')
  }

  function validateRecipe(): void {
    setErrors([])
    if (!name) validationErrors.push('Введите название рецепта')
    if (!category) validationErrors.push('Выберите категорию рецепта')
    if (!time) validationErrors.push('Введите время приготовления')
    if (!difficulty) validationErrors.push('Выберите сложность рецепта')
    if (!description) validationErrors.push('Введите описание приготовления')
    if (!totalIngredients.length) validationErrors.push('Введите ингредиенты')
    steps.forEach((step, index) => {
      if (!step.description) validationErrors.push(`Введите описание для шага ${index + 1}`)
    })
    setErrors(validationErrors)
  }

  async function onSubmit() {
    validateRecipe()
    if (!validationErrors.length) {
      try {
        setErrors([])
        setLoading(true)
        axios.defaults.baseURL = backendUrl
        axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        }
        const requestOptions = {
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
        const recipeData = {
          name,
          category,
          img,
          time,
          difficulty,
          description,
          totalIngredients,
          steps,
          hidden,
        }
        const { data } = await axios.post<CreateRecipeResponse>(
          '/recipes',
          recipeData,
          requestOptions,
        )
        setLoading(false)
        setRecipeId(data.recipe._id)
        resetCreateRecipe()
        setModalFinishIsOpen(true)
      } catch (error) {
        if (axios.isAxiosError<CreateRecipeErrorResponse>(error)) {
          const data = error.response?.data
          if (data) {
            setErrors([data?.error?.message])
          }
        }
        setLoading(false)
      }
    }
  }

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
        {step === 4 && <Step4 errors={errors} />}
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
        <Button text="Назад" onClick={onClickBack} block />
        <Button
          text={step !== stepsCount ? 'Далее' : 'Сохранить'}
          onClick={onClickNext}
          variant="primary"
          block
          disabled={!stepIsValid || loading}
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

      <Modal
        open={modalFinishIsOpen}
        setOpen={setModalFinishIsOpen}
        onOk={() => navigate(`/recipes/${recipeId}`, { replace: true })}
        okText="Готово"
        title="Рецепт создан"
        text="Рецепт сохранён в базе данных"
      />
    </div>
  )
}

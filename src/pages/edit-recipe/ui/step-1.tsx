import { useEffect } from 'react'

import { RECIPE_LIMITS, useCategories } from '@/entities/recipe'

import Input from '@/shared/ui/input'
import PhotoUpload from '@/shared/ui/photo-upload'
import Select from '@/shared/ui/select'
import TextArea from '@/shared/ui/text-area'

import type { CreateRecipeStore } from '../store/create-recipe-store'
import type { EditRecipeStore } from '../store/edit-recipe-store'

type StepProps = {
  setStepIsValid: (status: boolean) => void
  store: CreateRecipeStore | EditRecipeStore
}

export default function Step1({ setStepIsValid, store }: StepProps): React.JSX.Element {
  const { categories } = useCategories()
  const { recipe, setName, setCategoryId, setDescription, setImg } = store()
  const { name, categoryId, description, img } = recipe

  const categoriesOptions = categories.map(category => ({
    value: category.id.toString(),
    label: category.fullName,
  }))

  useEffect(() => {
    if (name && categoryId && description) setStepIsValid(true)
    else setStepIsValid(false)
  }, [name, categoryId, description, setStepIsValid])

  return (
    <form>
      <Input
        value={name}
        onChange={value => setName(value)}
        placeholder="Введите название блюда"
        label="Название"
        showCount
        maxLength={RECIPE_LIMITS.name.max}
      />

      <Select
        value={categoryId.toString()}
        options={categoriesOptions}
        onChange={value => setCategoryId(value)}
        placeholder="Выберите категорию"
        label="Категория"
      />

      <TextArea
        value={description}
        onChange={value => setDescription(value)}
        label="Описание"
        showCount
        maxLength={RECIPE_LIMITS.description.max}
        className="mt-2"
      />

      <PhotoUpload image={img} onChange={value => setImg(value)} label="Главное фото" />
    </form>
  )
}

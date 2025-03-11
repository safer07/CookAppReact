import { useEffect } from 'react'

import { RECIPE_LIMITS } from '@/entities/recipe'
import { categories } from '@/entities/recipeCategory/const/categories'

import Input from '@/shared/ui/Input'
import PhotoUpload from '@/shared/ui/PhotoUpload'
import Select from '@/shared/ui/Select'
import TextArea from '@/shared/ui/TextArea'

import { useCreateRecipe } from '../store/createRecipeStore'

type StepProps = { setStepIsValid: (status: boolean) => void }

export default function Step1({ setStepIsValid }: StepProps): React.JSX.Element {
  const { recipeData, setName, setCategoryId, setDescription, setImg } = useCreateRecipe()
  const { name, categoryId, description, img } = recipeData

  const categoriesOptions = categories.map(category => ({
    value: category.id.toString(),
    label: category.fullName,
  }))

  useEffect(() => {
    if (name && categoryId && description) setStepIsValid(true)
    else setStepIsValid(false)
  }, [name, categoryId, description, setStepIsValid])

  return (
    <form className="layout-grid flex flex-col gap-3">
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
      />

      <PhotoUpload image={img} onChange={value => setImg(value)} label="Главное фото" />
    </form>
  )
}

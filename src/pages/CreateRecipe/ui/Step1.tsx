import { useEffect } from 'react'

import useCreateRecipe from '../store/store'
import { categories } from '@/entities/recipeCategory/const/categories'
import RecipeLimits from '@/entities/recipe/const/limits'
import Input from '@/shared/ui/Input'
import TextArea from '@/shared/ui/TextArea'
import Select from '@/shared/ui/Select'
import PhotoUpload from '@/shared/ui/PhotoUpload'

type StepProps = { setStepIsValid: (status: boolean) => void }

export default function Step1({ setStepIsValid }: StepProps): React.JSX.Element {
  const { recipeData, setName, setCategory, setDescription, setImg } = useCreateRecipe()
  const { name, category, description, img } = recipeData

  const categoriesOptions = categories.map((category) => {
    return { value: category.id, label: category.fullName }
  })

  useEffect(() => {
    if (name && category && description) setStepIsValid(true)
    else setStepIsValid(false)
  }, [name, category, description])

  return (
    <form className="layout-grid flex flex-col gap-3">
      <Input
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Введите название блюда"
        label="Название"
        showCount
        maxLength={RecipeLimits.name.max}
      />

      <Select
        value={category}
        options={categoriesOptions}
        onChange={(value) => setCategory(value)}
        placeholder="Выберите категорию"
        label="Категория"
      />

      <TextArea
        value={description}
        onChange={(value) => setDescription(value)}
        label="Описание"
        showCount
        maxLength={RecipeLimits.description.max}
      />

      <PhotoUpload image={img} onChange={(value) => setImg(value)} label="Главное фото" />
    </form>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RecipeInfoSkeleton from './RecipeInfoSkeleton'
import { LikeButton } from '@/features/favorites'
import { useUser } from '@/entities/user'
import {
  getRecipeDifficultyTextAndSurface,
  recipesService,
  type FullRecipe,
} from '@/entities/recipe'
import { categories } from '@/entities/recipeCategory/const/categories'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import Modal from '@/shared/ui/Modal'
import Tag from '@/shared/ui/Tag'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import { catchHttpError, navigateBack } from '@/shared/lib'
import { RECIPES_ROUTE } from '@/shared/routes'
import type { CustomError } from '@/shared/model'

type RecipeInfoProps = {
  recipe: FullRecipe
}

export default function RecipeInfo({ recipe }: RecipeInfoProps): React.JSX.Element {
  const navigate = useNavigate()
  const { user } = useUser()
  const isAuthor = user?._id === recipe.author
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe?.difficulty,
  )
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<CustomError>(null)

  const recipeCategory = categories.find((category) => category.id === recipe?.category)

  async function onDelete() {
    try {
      setError(null)
      await recipesService.delete(recipe._id)
      navigate(RECIPES_ROUTE, { replace: true })
    } catch (error) {
      catchHttpError(error, setError)
    }
  }

  return (
    <>
      <div className="layout-fullwidth relative">
        <img className="aspect-9/7 w-full object-cover" src={recipe?.img} alt={recipe?.name} />
        <ButtonIcon
          className="absolute top-2 left-2"
          icon="arrow_left"
          onClick={() => navigateBack(navigate)}
          size="small"
        />
        {isAuthor ? (
          <div className="absolute top-2 right-2 flex gap-2">
            {/* TODO: ссылка на редактирование рецепта */}
            <ButtonIcon icon="edit" onClick={() => {}} size="small" />
            <ButtonIcon icon="delete" onClick={() => setModalDeleteIsOpen(true)} size="small" />
          </div>
        ) : (
          <LikeButton itemId={recipe._id} className="absolute top-2 right-2" />
        )}
      </div>

      <ErrorComponent error={error} className="mt-2" />

      <div className="grid gap-1 pt-1 pb-2">
        <div>
          <h1 className="headline-large">{recipe?.name}</h1>
          <p className="text-txt-secondary pt-0.5">{recipeCategory?.fullName}</p>
        </div>
        <p className="text-txt-secondary">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="fill-primary size-2">
              <use href="/images/icons.svg#clock"></use>
            </svg>
            <div className="label-small text-txt-secondary">{recipe.time} минут</div>
          </div>
          <Tag text={difficultyText} surface={tagDifficultySurface} />
        </div>
      </div>

      <Modal
        open={modalDeleteIsOpen}
        setOpen={setModalDeleteIsOpen}
        onOk={onDelete}
        okText="Удалить"
        title="Удалить рецепт?"
        text="Восстановить его будет невозможно."
        type="negative"
        cancellable
      />
    </>
  )
}

RecipeInfo.Skeleton = RecipeInfoSkeleton

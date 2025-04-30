import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { LikeButton } from '@/entities/favorites'
import { getRecipeDifficultyTextAndSurface, useCategories } from '@/entities/recipe'
import type { FullRecipe } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { catchHttpError, minsToHoursAndMins, navigateBack } from '@/shared/lib'
import { EDIT_RECIPE_ROUTE } from '@/shared/routes'
import ButtonIcon from '@/shared/ui/button-icon'
import Image from '@/shared/ui/image'
import Modal from '@/shared/ui/modal'
import Tag from '@/shared/ui/tag'

import { useDeleteRecipe } from '../../lib/use-delete-recipe'
import RecipeInfoSkeleton from './recipe-info-skeleton'

export default function RecipeInfo({ recipe }: { recipe: FullRecipe }): React.JSX.Element {
  const navigate = useNavigate()
  const { categories } = useCategories()
  const { user } = useUser()
  const { deleteRecipe } = useDeleteRecipe({ recipeId: recipe.id })
  const isAuthor = user?.id === recipe.authorId
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe.difficulty,
  )
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false)
  const recipeCategory = categories.find(category => category.id === recipe.categoryId)

  function onDelete() {
    toast.promise(deleteRecipe(), {
      loading: 'Удаление...',
      success: 'Рецепт удалён',
      error: error => `Не удалось удалить рецепт:
              ${catchHttpError(error)?.message}`,
    })
  }

  return (
    <>
      <div className="layout-wide relative">
        <Image className="aspect-9/7 w-full object-cover" src={recipe.img} alt={recipe.name} />
        <ButtonIcon
          className="absolute top-2 left-2"
          icon="arrow_left"
          onClick={() => navigateBack(navigate)}
          size="small"
          ariaLabel="Назад"
        />
        {isAuthor ? (
          <div className="absolute top-2 right-2 flex gap-2">
            <ButtonIcon
              icon="edit"
              onClick={() => navigate(`${EDIT_RECIPE_ROUTE}/${recipe.id}`)}
              size="small"
              ariaLabel="Редактировать рецепт"
            />
            <ButtonIcon
              icon="delete"
              onClick={() => setModalDeleteIsOpen(true)}
              size="small"
              ariaLabel="Удалить рецепт"
            />
          </div>
        ) : (
          <LikeButton itemId={recipe.id} className="absolute top-2 right-2" />
        )}
        {recipe.hidden && (
          <Tag className="absolute right-2 bottom-2" text="Рецепт скрыт" surface="surface-yellow" />
        )}
      </div>

      <div className="grid gap-1 pt-1 pb-2">
        <div>
          <h1 className="headline-large">{recipe.name}</h1>
          <p className="text-txt-secondary pt-0.5">{recipeCategory?.fullName}</p>
        </div>
        <p className="text-txt-secondary">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="fill-primary size-2">
              <use href="/images/icons.svg#clock" />
            </svg>
            <div className="label-small text-txt-secondary">{minsToHoursAndMins(recipe.time)}</div>
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

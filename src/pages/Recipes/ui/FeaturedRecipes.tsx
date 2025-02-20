import RecipesList from '@/widgets/RecipesList'

import type { Recipe } from '@/entities/recipe'

import type { HttpStatus } from '@/shared/model'

import { useRecipes } from '../store/recipesStore'

type FeaturedRecipesProps = {
  categories: RecipeCategory[]
  recipes: Recipe[]
  status: HttpStatus
}

export default function FeaturedRecipes({
  categories,
  recipes,
  status,
}: FeaturedRecipesProps): React.JSX.Element {
  const setCategories = useRecipes((state) => state.setCategories)

  // TODO: категории и рецепты загружать самостоятельно (а не фильтровать), без store, limit=5

  return (
    <>
      {categories.map((category) => (
        <div className="mt-3" key={category.id}>
          <RecipesList
            title={category.fullName}
            recipes={recipes.filter((recipe) => recipe.category === category.id)}
            status={status}
            button={{
              name: 'Смотреть все',
              onClick: () => setCategories([category.id]),
            }}
          />
        </div>
      ))}
    </>
  )
}

import RecipesList from '@/widgets/RecipesList'

import type { Recipe, RecipeCategory } from '@/entities/recipe'

import type { HttpStatus } from '@/shared/model'

import { useCatalog } from '../store/catalogStore'

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
  const setFilteredCategories = useCatalog(state => state.setFilteredCategories)

  // TODO: категории и рецепты загружать самостоятельно (а не фильтровать), без store, limit=5

  return (
    <>
      {categories.map(category => (
        <div className="mt-3" key={category.id}>
          <RecipesList
            title={category.fullName}
            recipes={recipes.filter(recipe => recipe.categoryId === category.id)}
            status={status}
            button={{
              name: 'Смотреть все',
              onClick: () => setFilteredCategories([category.id]),
            }}
          />
        </div>
      ))}
    </>
  )
}

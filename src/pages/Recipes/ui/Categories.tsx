import type { RecipeCategory } from '@/entities/recipeCategory/const/categories'
import RecipeCategoryCard from '@/entities/recipeCategory/ui/RecipeCategoryCard'

import { useRecipes } from '../store/recipesStore'

type CategoryProps = {
  categories: RecipeCategory[]
}

export default function Categories({ categories }: CategoryProps): React.JSX.Element {
  const setCategories = useRecipes(state => state.setCategories)

  return (
    <>
      <h2 className="headline-medium">Категории</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {!categories.length
          ? [...new Array(9)].map((_, i) => <RecipeCategoryCard.Skeleton key={i} />)
          : categories.map(category => (
              <RecipeCategoryCard
                key={category.id}
                category={category}
                onClick={() => setCategories([category.id])}
              />
            ))}
      </div>
    </>
  )
}

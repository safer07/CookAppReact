import { useEffect, useState } from 'react'

import useRecipes from '../../Recipes/store/store'
import RecipesList from '@/widgets/RecipesList'
import { Recipe } from '@/entities/recipe/model'

type FeaturedRecipesProps = {
  excludeId?: string
}

export default function FeaturedRecipes({ excludeId }: FeaturedRecipesProps): JSX.Element {
  const recipes = useRecipes((state) => state.items)
  const status = useRecipes((state) => state.status)
  const fetchRecipes = useRecipes((state) => state.fetchRecipes)
  const [tempRecipes, setTempRecipes] = useState<Recipe[]>([])

  // TODO: пока загружаются все рецепты, затем фильтруются. Нужно подгружать их с бэкенда запросом
  useEffect(() => {
    fetchRecipes()
  }, [])

  // TODO: костыльно фильтруем рецепты, чтобы не отображался в предложенных такой же рецепт
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => recipe._id !== excludeId)
    setTempRecipes(filteredRecipes)
  }, [recipes, excludeId])

  return (
    <div className="py-2">
      <RecipesList title="Другие рецепты" recipes={tempRecipes} status={status} />
    </div>
  )
}

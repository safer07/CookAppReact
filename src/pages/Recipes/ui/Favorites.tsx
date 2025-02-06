import { useEffect, useState } from 'react'

import useRecipes from '../store/store'
import RecipesList from '@/widgets/RecipesList'
import useFavorites from '@/features/favorites/store/store'
import { Recipe } from '@/entities/recipe/model'

export default function Favorites(): JSX.Element {
  const { items: recipes, status, fetchRecipes } = useRecipes()
  const favouriteRecipes = useFavorites((state) => state.favorites.recipes)
  const [tempRecipes, setTempRecipes] = useState<Recipe[]>([])

  // TODO: пока загружаются все рецепты, затем фильтруются. Нужно подгружать их с бэкенда запросом
  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => favouriteRecipes.includes(recipe._id))
    setTempRecipes(filteredRecipes)
  }, [recipes])

  return (
    <div className="py-2">
      <RecipesList title="Рецепты в избранном" recipes={tempRecipes} status={status} />
    </div>
  )
}

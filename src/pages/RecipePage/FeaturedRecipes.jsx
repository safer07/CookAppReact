import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes, selectRecipes } from "../../redux/slices/recipesSlice";
import RecipesList from "../../components/RecipesList";

export default function FeaturedRecipes({ excludeId }) {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const [tempRecipes, setTempRecipes] = useState([]);

  // TODO: пока загружаются все рецепты, затем фильтруются. Нужно создать в redux массив с likedRecipes, или подгружать их с бэкенда запросом
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  // TODO: костыльно фильтруем рецепты, чтобы не отображался в предложенных такой же рецепт
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => recipe.id !== excludeId);
    setTempRecipes(filteredRecipes);
  }, [recipes, excludeId]);

  return (
    <div className="py-2">
      <RecipesList
        title="Другие рецепты"
        recipes={tempRecipes}
        status={status}
      />
    </div>
  );
}

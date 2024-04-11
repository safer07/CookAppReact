import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../../store/store";
import {
  fetchRecipes,
  selectRecipes,
} from "../../../store/slices/recipesSlice";
import RecipesList from "../../../widgets/RecipesList";

type FeaturedRecipesProps = {
  excludeId: string;
};

export default function FeaturedRecipes({ excludeId }: FeaturedRecipesProps) {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const [tempRecipes, setTempRecipes] = useState<IRecipeItem[]>([]);

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

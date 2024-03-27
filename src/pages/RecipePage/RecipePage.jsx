import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { categories } from "../../data";
import {
  addRecipe,
  removeRecipe,
  selectLikedRecipes,
} from "../../redux/slices/likedRecipesSlice";
import { fetchRecipe } from "../../api";
import LikeButton from "../../ui/LikeButton";
import ButtonIcon from "../../ui/ButtonIcon";
import Tag from "../../ui/Tag";
import FeaturedRecipes from "./FeaturedRecipes";
import scrollNoSmooth from "../../utils/scrollNoSmooth";
import RecipeInfoSkeleton from "./RecipeInfoSkeleton";

export default function RecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const likedRecipes = useSelector(selectLikedRecipes);

  const recipeCategory = categories.find(
    (category) => category.id === recipe?.category,
  );

  let difficultyText, tagDifficultySurface;

  switch (recipe?.difficulty) {
    case 1:
      difficultyText = "Легко";
      tagDifficultySurface = "surface-green";
      break;
    case 2:
      difficultyText = "Средне";
      tagDifficultySurface = "surface-yellow";
      break;
    case 3:
      difficultyText = "Трудно";
      tagDifficultySurface = "surface-red";
      break;
    default:
      difficultyText = "???";
  }

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      const response = await fetchRecipe(id);
      setRecipe(response);
      setLoading(false);
    }
    loadRecipe();
  }, [id]);

  useLayoutEffect(() => {
    scrollNoSmooth();
  }, [id]);

  function handleLike(id) {
    if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
    else dispatch(addRecipe(id));
  }

  return (
    <>
      {loading && <RecipeInfoSkeleton />}
      {recipe && (
        <>
          <div className="layout-fullwidth relative">
            <img
              className="aspect-[9/7] w-full object-cover"
              src={recipe?.img}
              alt={recipe?.name}
            />
            <ButtonIcon
              className="absolute left-2 top-2"
              icon="/images/icons.svg#arrow_left"
              onClick={() => navigate(-1)}
            />
            <LikeButton
              className="absolute right-2 top-2"
              active={likedRecipes.includes(recipe.id)}
              itemId={recipe.id}
              handleLike={handleLike}
            />
          </div>
          <div className="grid gap-1 pb-2 pt-1">
            <div>
              <h1 className="headline-large">{recipe?.name}</h1>
              <p className="pt-0.5 text-secondary-color">
                {recipeCategory.fullName}
              </p>
            </div>
            <p className="text-secondary-color">
              Омлет - это нежное яичное блюдо, которое прекрасно подходит на
              завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий
              перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый
              рецепт - классический омлет.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <svg className="size-2 fill-primary">
                  <use href="/images/icons.svg#clock"></use>
                </svg>
                <div className="label-small text-secondary-color">
                  {recipe.time} минут
                </div>
              </div>
              <Tag text={difficultyText} surface={tagDifficultySurface} />
            </div>
          </div>
          <FeaturedRecipes excludeId={recipe.id} />
        </>
      )}
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LikeButton from "../../ui/LikeButton";
import Tag from "../../ui/Tag";
import { categories } from "../../data";
import {
  addRecipe,
  removeRecipe,
  selectLikedRecipes,
} from "../../redux/slices/likedRecipesSlice";

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const likedRecipes = useSelector(selectLikedRecipes);

  const recipeCategory = categories.find(
    (category) => category.id === recipe.category,
  );

  let difficultyText, tagDifficultySurface;

  switch (recipe.difficulty) {
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

  function handleLike(id) {
    if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
    else dispatch(addRecipe(id));
  }

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="surface-default overflow-hidden rounded-2xl shadow"
    >
      <div className="relative">
        <img
          className="aspect-video w-full object-cover"
          src={recipe.img}
          alt={recipe.name}
        />
        <LikeButton
          className="absolute right-1.5 top-1.5"
          active={likedRecipes.includes(recipe.id)}
          itemId={recipe.id}
          handleLike={handleLike}
        />
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small line-clamp-2 h-[calc(var(--h3-line-height)*2)]">
          {recipe.name}
        </h3>
        <p className="text-secondary-color">{recipeCategory.fullName}</p>
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
    </Link>
  );
}
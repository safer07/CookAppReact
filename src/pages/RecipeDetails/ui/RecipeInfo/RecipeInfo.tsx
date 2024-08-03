import { useNavigate } from "react-router-dom";

import RecipeInfoSkeleton from "./RecipeInfoSkeleton";
import LikeButton from "../../../../features/favouriteRecipe/ui/LikeButton";
import { categories } from "../../../../entities/recipeCategory/const/categories";
import ButtonIcon from "../../../../shared/ui/ButtonIcon";
import Tag from "../../../../shared/ui/Tag";
import getRecipeDifficultyTextAndSurface from "../../../../shared/utils/getRecipeDifficultyTextAndSurface";

type RecipeInfoProps = {
  recipe: IFullRecipeItem;
};

export default function RecipeInfo({ recipe }: RecipeInfoProps): JSX.Element {
  const navigate = useNavigate();
  const [difficultyText, tagDifficultySurface] =
    getRecipeDifficultyTextAndSurface(recipe?.difficulty);

  const recipeCategory = categories.find(
    (category) => category.id === recipe?.category,
  );

  return (
    <>
      <div className="layout-fullwidth relative">
        <img
          className="aspect-[9/7] w-full object-cover"
          src={recipe?.img}
          alt={recipe?.name}
        />
        <ButtonIcon
          className="absolute left-2 top-2"
          icon="arrow_left"
          onClick={() => navigate(-1)}
          size="small"
        />
        <LikeButton itemId={recipe._id} className="absolute right-2 top-2" />
      </div>
      <div className="grid gap-1 pb-2 pt-1">
        <div>
          <h1 className="headline-large">{recipe?.name}</h1>
          <p className="pt-0.5 text-secondary-color">
            {recipeCategory?.fullName}
          </p>
        </div>
        <p className="text-secondary-color">{recipe.description}</p>
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
    </>
  );
}

RecipeInfo.Skeleton = RecipeInfoSkeleton;

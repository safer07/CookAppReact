import { useProfile } from "../../context/UserProfileContext";
import LikeButton from "../../ui/LikeButton";
import Tag from "../../ui/Tag";
import { categories } from "../../data";

export default function RecipeCard({ recipe }) {
  const { likedRecipes } = useProfile();

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

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="relative">
        <img
          className="aspect-video w-full object-cover"
          src={recipe.img}
          alt={recipe.name}
        />
        <LikeButton
          className="absolute right-1.5 top-1.5"
          active={likedRecipes.includes(recipe.id)}
          recipeId={recipe.id}
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
              <use href="./images/icons.svg#clock"></use>
            </svg>
            <div className="label-small text-secondary-color">
              {recipe.time} минут
            </div>
          </div>
          <Tag text={difficultyText} surface={tagDifficultySurface} />
        </div>
      </div>
    </div>
  );
}

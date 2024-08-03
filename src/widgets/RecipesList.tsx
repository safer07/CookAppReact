import { TypeRecipesStatus } from "../pages/Recipes/store/store";
import RecipeCard from "../entities/recipe/ui/RecipeCard";

type RecipesListProps = {
  title: string;
  recipes: IRecipeItem[];
  status: TypeRecipesStatus;
  button?: { name: string; onClick: () => void };
};

export default function RecipesList({
  title,
  recipes,
  status,
  button,
}: RecipesListProps): JSX.Element {
  const skeletonRecipes = [...new Array(4)].map((_, i) => (
    <RecipeCard.Skeleton key={i} />
  ));

  return (
    <>
      {!button && (
        <h2 className="headline-medium">
          {status === "error" ? "Не удалось загрузить рецепты" : title}
        </h2>
      )}

      {button && (
        <div className="flex items-baseline justify-between">
          <h2 className="headline-medium">{title}</h2>
          <button
            className="text-accent-color hover-hover:hover:text-primary-active"
            onClick={button?.onClick}
          >
            {button?.name}
          </button>
        </div>
      )}

      {status !== "error" && (
        <div className="mt-2 grid gap-2">
          {status === "loading"
            ? skeletonRecipes
            : recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
        </div>
      )}
    </>
  );
}

import { RecipesStatus } from "../store/slices/recipesSlice";
import RecipeCard from "../entities/recipe/components/RecipeCard";
import RecipeCardSkeleton from "../entities/recipe/components/RecipeCard/RecipeCardSkeleton";

type RecipesListProps = {
  title: string;
  recipes: IRecipeItem[];
  status: string;
  button?: { name: string; onClick: () => void };
};

export default function RecipesList({
  title,
  recipes,
  status,
  button,
}: RecipesListProps) {
  const skeletonRecipes = [...new Array(4)].map((_, i) => (
    <RecipeCardSkeleton key={i} />
  ));

  return (
    <>
      {!button && (
        <h2 className="headline-medium">
          {status === RecipesStatus.ERROR
            ? "Не удалось загрузить рецепты"
            : title}
        </h2>
      )}

      {button && (
        <div className="flex items-baseline justify-between">
          <h2 className="headline-medium">{title}</h2>
          <button className="text-accent-color" onClick={button?.onClick}>
            {button?.name}
          </button>
        </div>
      )}

      {status !== RecipesStatus.ERROR && (
        <div className="mt-2 grid gap-2">
          {status === RecipesStatus.LOADING
            ? skeletonRecipes
            : recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      )}
    </>
  );
}
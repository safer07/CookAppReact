import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCard/RecipeCardSkeleton";

type RecipesListProps = {
  title: string;
  recipes: {
    id: string;
    name: string;
    category: string;
    img: string;
    time: number;
    difficulty: number;
  }[];
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
          {status === "error" ? "Не удалось загрузить рецепты" : title}
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

      {status !== "error" && (
        <div className="mt-2 grid gap-2">
          {status === "loading"
            ? skeletonRecipes
            : recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      )}
    </>
  );
}

import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";

export default function RecipesList({ title, recipes, status, button }) {
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
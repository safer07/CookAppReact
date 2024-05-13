import useRecipes from "../store/store";
import RecipeCategoryCard from "../../../entities/recipeCategory/components/RecipeCategoryCard";

type CategoryProps = {
  categories: IRecipeCategoryItem[];
};

export default function Categories({ categories }: CategoryProps): JSX.Element {
  const setCategoryId = useRecipes((state) => state.setCategoryId);

  return (
    <>
      <h2 className="headline-medium">Категории</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {!categories.length
          ? [...new Array(9)].map((_, i) => (
              <RecipeCategoryCard.Skeleton key={i} />
            ))
          : categories.map((category) => (
              <RecipeCategoryCard
                key={category.id}
                category={category}
                onClick={() => setCategoryId(category.id)}
              />
            ))}
      </div>
    </>
  );
}

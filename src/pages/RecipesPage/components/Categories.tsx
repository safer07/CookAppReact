import { useDispatch } from "react-redux";

import { setCategoryId } from "../../../store/slices/filterRecipesSlice";
import RecipeCategoryCard from "../../../entities/recipeCategory/components/RecipeCategoryCard";
import RecipeCategoryCardSkeleton from "../../../entities/recipeCategory/components/RecipeCategoryCard/RecipeCategoryCardSkeleton";

type CategoryProps = {
  categories: IRecipeCategoryItem[];
};

export default function Categories({ categories }: CategoryProps) {
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="headline-medium">Категории</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {!categories.length
          ? [...new Array(9)].map((_, i) => (
              <RecipeCategoryCardSkeleton key={i} />
            ))
          : categories.map((category) => (
              <RecipeCategoryCard
                key={category.id}
                category={category}
                onClick={() => dispatch(setCategoryId(category.id))}
              />
            ))}
      </div>
    </>
  );
}

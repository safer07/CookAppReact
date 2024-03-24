import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchRecipe } from "../api";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    async function loadRecipe() {
      const response = await fetchRecipe(id);
      setRecipe(response);
    }
    loadRecipe();
  }, []);

  return (
    <>
      <div className="py-1.5">
        <h1 className="headline-large">Рецепт</h1>
        <img src={recipe?.img} alt={recipe?.name} />
        <div>{recipe?.name}</div>
      </div>
    </>
  );
}

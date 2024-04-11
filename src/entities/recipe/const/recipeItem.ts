type Ingredient = { name: string; amount: number; unit: string };

type IRecipeItem = {
  id: string;
  name: string;
  category: string;
  img: string;
  time: number;
  difficulty: number;
};

interface IFullRecipeItem extends IRecipeItem {
  description: string;
  totalIngredients: Ingredient[];
  steps: { description: string; ingredients: Ingredient[]; img: string }[];
}

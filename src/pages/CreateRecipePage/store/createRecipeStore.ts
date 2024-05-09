import { makeAutoObservable } from "mobx";

export const emptyStep = { description: "", ingredients: [], img: "" };

class CreateRecipeStore {
  name: string = "";
  category: string = "";
  img: string = "";
  timeHours: number | null = null;
  timeMinutes: number | null = null;
  difficulty: number = 0;
  description: string = "";
  totalIngredients: Ingredient[] = [];
  steps: RecipeStep[] = [emptyStep];
  hidden: boolean = false;

  get time(): number {
    const hours = this.timeHours || 0;
    const minutes = this.timeMinutes || 0;
    return hours * 60 + minutes;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setName = (value: string) => (this.name = value);
  setCategory = (value: string) => (this.category = value);
  setImg = (value: string) => (this.img = value);
  setTimeHours = (value: number) => (this.timeHours = value);
  setTimeMinutes = (value: number) => (this.timeMinutes = value);
  setDifficulty = (value: number) => (this.difficulty = value);
  setDescription = (value: string) => (this.description = value);
  setTotalIngredients = (value: Ingredient[]) =>
    (this.totalIngredients = value);
  setSteps = (value: RecipeStep[]) => (this.steps = value);
  setHidden = (value: boolean) => (this.hidden = value);

  resetCreateRecipe = () => {
    this.name = "";
    this.category = "";
    this.img = "";
    this.timeHours = null;
    this.timeMinutes = null;
    this.difficulty = 0;
    this.description = "";
    this.totalIngredients = [];
    this.steps = [emptyStep];
    this.hidden = false;
  };
}

export default new CreateRecipeStore();

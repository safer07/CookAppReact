import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

type FullRecipeStore = {
  recipe: IFullRecipeItem | null;
  status: "init" | "loading" | "success" | "error";
  fetchFullRecipe: (id: string) => Promise<void>;
};

const useFullRecipe = create<FullRecipeStore>()(
  devtools((set) => ({
    recipe: null,
    status: "init",
    fetchFullRecipe: async (id) => {
      try {
        set({ status: "loading" });
        const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/fullRecipes/${id}`;
        const response = await axios.get<IFullRecipeItem>(url);
        set({ recipe: response.data });
        set({ status: "success" });
      } catch (error) {
        set({ status: "error" });
        console.error(error);
      }
    },
  })),
);

export default useFullRecipe;

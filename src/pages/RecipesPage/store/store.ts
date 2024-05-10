import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

export type TypeRecipesStatus = "init" | "loading" | "success" | "error";

type RecipesFilters = {
  categoryId?: string | null;
  searchQuery?: string;
};

type RecipesStore = {
  items: IRecipeItem[];
  status: TypeRecipesStatus;
  filters: RecipesFilters;
  fetchRecipes: (filters?: RecipesFilters) => Promise<void>;
  setCategoryId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
};

const initialFilters = { categoryId: null, searchQuery: "" };

const useRecipes = create<RecipesStore>()(
  devtools(
    immer((set) => ({
      items: [],
      status: "init",
      filters: initialFilters,
      fetchRecipes: async (filters) => {
        try {
          set({ status: "loading" });
          const category = filters?.categoryId
            ? `category=${filters.categoryId}`
            : "";
          const search = filters?.searchQuery
            ? `&search=${filters.searchQuery}`
            : "";
          const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`;
          const response = await axios.get<IRecipeItem[]>(url);
          set({ items: response.data });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error" });
          console.error(error);
        }
      },
      setCategoryId: (id) =>
        set((state) => {
          state.filters.categoryId = id;
        }),
      setSearchQuery: (query) =>
        set((state) => {
          state.filters.searchQuery = query;
        }),
      resetFilters: () => set({ filters: initialFilters }),
    })),
  ),
);

export default useRecipes;

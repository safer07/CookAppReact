import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UserStore = {
  favouriteRecipes: string[];
  addFavouriteRecipe: (id: string) => void;
  removeFavouriteRecipe: (id: string) => void;
};

const useUser = create<UserStore>()(
  persist(
    devtools(
      immer((set) => ({
        favouriteRecipes: ["r1", "r5", "r7", "r9"],
        addFavouriteRecipe: (id) =>
          set((state) => {
            state.favouriteRecipes.push(id);
          }),
        removeFavouriteRecipe: (id) =>
          set((state) => {
            state.favouriteRecipes = state.favouriteRecipes.filter(
              (item) => item !== id,
            );
          }),
      })),
    ),
    { name: "userStore", version: 1 },
  ),
);

export default useUser;

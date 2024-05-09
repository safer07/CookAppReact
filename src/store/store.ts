import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import filterRecipes from "./slices/filterRecipesSlice";
import favouriteRecipes from "./slices/favouriveRecipesSlice";
import recipes from "./slices/recipesSlice";
import fullRecipe from "./slices/fullRecipeSlice";

export const store = configureStore({
  reducer: {
    filterRecipes,
    favouriteRecipes,
    recipes,
    fullRecipe,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

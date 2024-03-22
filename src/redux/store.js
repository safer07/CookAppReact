import { configureStore } from "@reduxjs/toolkit";
import filterRecipes from "./slices/filterRecipesSlice";
import likedRecipes from "./slices/likedRecipesSlice";
import recipes from "./slices/recipesSlice";

export const store = configureStore({
  reducer: {
    filterRecipes,
    likedRecipes,
    recipes,
  },
});

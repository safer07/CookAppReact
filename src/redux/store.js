import { configureStore } from "@reduxjs/toolkit";
import navBar from "./slices/navBarSlice";
import filterRecipes from "./slices/filterRecipesSlice";
import likedRecipes from "./slices/likedRecipesSlice";
import recipes from "./slices/recipesSlice";
import fullRecipe from "./slices/fullRecipeSlice";

export const store = configureStore({
  reducer: {
    navBar,
    filterRecipes,
    likedRecipes,
    recipes,
    fullRecipe,
  },
});

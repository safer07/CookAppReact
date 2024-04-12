import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import navBar from "./slices/navBarSlice";
import createRecipe from "./slices/createRecipeSlice";
import filterRecipes from "./slices/filterRecipesSlice";
import likedRecipes from "./slices/likedRecipesSlice";
import recipes from "./slices/recipesSlice";
import fullRecipe from "./slices/fullRecipeSlice";

export const store = configureStore({
  reducer: {
    navBar,
    createRecipe,
    filterRecipes,
    likedRecipes,
    recipes,
    fullRecipe,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

import { configureStore } from "@reduxjs/toolkit";
import filterRecipesReducer from "./slices/filterRecipesSlice";
import likedRecipesReducer from "./slices/likedRecipesSlice";

// const rootReducer = {
//   //   userInput: userInputReducer,
//   //   data: dataReducer,
//   input: 123,
// };

export const store = configureStore({
  reducer: {
    filterRecipes: filterRecipesReducer,
    likedRecipes: likedRecipesReducer,
  },
});

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface FavouriteRecipesSliceState {
  items: string[];
}

const initialState: FavouriteRecipesSliceState = {
  items: ["r1", "r5", "r7", "r9"],
};

const FavouriteRecipesSlice = createSlice({
  name: "favouriteRecipes",
  initialState,
  reducers: {
    addRecipe(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
    },
    removeRecipe(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const selectFavouriteRecipes = (state: RootState) =>
  state.favouriteRecipes.items;
export const { addRecipe, removeRecipe } = FavouriteRecipesSlice.actions;
export default FavouriteRecipesSlice.reducer;

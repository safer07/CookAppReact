import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface LikedRecipesSliceState {
  items: string[];
}

const initialState: LikedRecipesSliceState = {
  items: ["r1", "r5", "r7", "r9"],
};

const likedRecipesSlice = createSlice({
  name: "likedRecipes",
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

export const selectLikedRecipes = (state: RootState) =>
  state.likedRecipes.items;
export const { addRecipe, removeRecipe } = likedRecipesSlice.actions;
export default likedRecipesSlice.reducer;

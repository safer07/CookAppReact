import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["r1", "r5", "r7", "r9"],
};

const likedRecipesSlice = createSlice({
  name: "likedRecipes",
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.items.push(action.payload);
    },
    removeRecipe(state, action) {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { addRecipe, removeRecipe } = likedRecipesSlice.actions;

export default likedRecipesSlice.reducer;

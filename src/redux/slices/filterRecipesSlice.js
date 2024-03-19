import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
};

const filterRecipesSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategoryId, resetFilters } = filterRecipesSlice.actions;

export default filterRecipesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface filterRecipesSliceState {
  categoryId: string | null;
  searchQuery: string;
}

const initialState: filterRecipesSliceState = {
  categoryId: null,
  searchQuery: "",
};

const filterRecipesSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryId = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const selectFilterRecipes = (state: RootState) => state.filterRecipes;
export const { setCategoryId, setSearchQuery, resetFilters } =
  filterRecipesSlice.actions;
export default filterRecipesSlice.reducer;

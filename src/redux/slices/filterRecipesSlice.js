import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
  searchQuery: "",
};

const filterRecipesSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const selectFilterRecipes = (state) => state.filterRecipes;
export const { setCategoryId, setSearchQuery, resetFilters } =
  filterRecipesSlice.actions;
export default filterRecipesSlice.reducer;

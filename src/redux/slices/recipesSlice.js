import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (props) => {
    const category = props?.categoryId ? `category=${props.categoryId}` : "";
    const search = props?.searchQuery ? `&search=${props.searchQuery}` : "";
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`;
    const response = await axios.get(url);
    return response.data;
  },
);

const initialState = {
  items: [],
  status: "",
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectRecipes = (state) => state.recipes;
export const { setItems } = recipesSlice.actions;
export default recipesSlice.reducer;

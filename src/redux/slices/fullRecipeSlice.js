import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFullRecipe = createAsyncThunk(
  "fullRecipe/fetchFullRecipe",
  async (id) => {
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/fullRecipes/${id}`;
    const response = await axios.get(url);
    return response.data;
  },
);

const initialState = {
  recipe: {},
  status: "",
};

const fullRecipeSlice = createSlice({
  name: "fullRecipe",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchFullRecipe.pending, (state) => {
        state.status = "loading";
        state.recipe = {};
      })
      .addCase(fetchFullRecipe.fulfilled, (state, action) => {
        state.status = "success";
        state.recipe = action.payload;
      })
      .addCase(fetchFullRecipe.rejected, (state) => {
        state.status = "error";
        state.recipe = {};
      });
  },
});

export const selectFullRecipe = (state) => state.fullRecipe;
export default fullRecipeSlice.reducer;

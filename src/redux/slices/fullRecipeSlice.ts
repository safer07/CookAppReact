import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

interface FullRecipeSliceState {
  recipe: IFullRecipeItem | null;
  status: "loading" | "success" | "error" | "";
}

export const fetchFullRecipe = createAsyncThunk<IFullRecipeItem, string>(
  "fullRecipe/fetchFullRecipe",
  async (id) => {
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/fullRecipes/${id}`;
    const response = await axios.get<IFullRecipeItem>(url);
    return response.data;
  },
);

const initialState: FullRecipeSliceState = {
  recipe: null,
  status: "",
};

const fullRecipeSlice = createSlice({
  name: "fullRecipe",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFullRecipe.pending, (state) => {
        state.status = "loading";
        state.recipe = null;
      })
      .addCase(
        fetchFullRecipe.fulfilled,
        (state, action: PayloadAction<IFullRecipeItem>) => {
          state.status = "success";
          state.recipe = action.payload;
        },
      )
      .addCase(fetchFullRecipe.rejected, (state) => {
        state.status = "error";
        state.recipe = null;
      });
  },
});

export const selectFullRecipe = (state: RootState) => state.fullRecipe;
export default fullRecipeSlice.reducer;

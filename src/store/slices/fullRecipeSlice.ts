import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

export enum FullRecipeStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface FullRecipeSliceState {
  recipe: IFullRecipeItem | null;
  status: FullRecipeStatus | "";
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
        state.status = FullRecipeStatus.LOADING;
        state.recipe = null;
      })
      .addCase(
        fetchFullRecipe.fulfilled,
        (state, action: PayloadAction<IFullRecipeItem>) => {
          state.status = FullRecipeStatus.SUCCESS;
          state.recipe = action.payload;
        },
      )
      .addCase(fetchFullRecipe.rejected, (state) => {
        state.status = FullRecipeStatus.ERROR;
        state.recipe = null;
      });
  },
});

export const selectFullRecipe = (state: RootState) => state.fullRecipe;
export default fullRecipeSlice.reducer;

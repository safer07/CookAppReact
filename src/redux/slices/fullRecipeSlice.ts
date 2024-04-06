import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

type Ingredient = { name: string; amount: number; unit: string };

type FullRecipeItem = {
  id: string;
  name: string;
  category: string;
  img: string;
  time: number;
  difficulty: number;
  description: string;
  totalIngredients: Ingredient[];
  steps: { description: string; ingredients: Ingredient[]; img: string }[];
};

interface FullRecipeSliceState {
  recipe: FullRecipeItem | null;
  status: "loading" | "success" | "error" | "";
}

export const fetchFullRecipe = createAsyncThunk<FullRecipeItem, string>(
  "fullRecipe/fetchFullRecipe",
  async (id) => {
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/fullRecipes/${id}`;
    const response = await axios.get<FullRecipeItem>(url);
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
        (state, action: PayloadAction<FullRecipeItem>) => {
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

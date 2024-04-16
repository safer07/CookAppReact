import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

export type TypeRecipesStatus = "loading" | "success" | "error" | "";

type RecipesFilters = {
  categoryId?: string | null;
  searchQuery?: string | null;
};

interface RecipesSliceState {
  items: IRecipeItem[];
  status: TypeRecipesStatus;
}

export const fetchRecipes = createAsyncThunk<
  IRecipeItem[],
  RecipesFilters | undefined
>("recipes/fetchRecipes", async (props) => {
  const category = props?.categoryId ? `category=${props.categoryId}` : "";
  const search = props?.searchQuery ? `&search=${props.searchQuery}` : "";
  const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`;
  const response = await axios.get<IRecipeItem[]>(url);
  return response.data;
});

const initialState: RecipesSliceState = {
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
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<IRecipeItem[]>) => {
          state.status = "success";
          state.items = action.payload;
        },
      )
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectRecipes = (state: RootState) => state.recipes;
export const { setItems } = recipesSlice.actions;
export default recipesSlice.reducer;

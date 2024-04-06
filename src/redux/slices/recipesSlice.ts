import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

enum RecipeStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type RecipeItem = {
  id: string;
  name: string;
  category: string;
  img: string;
  time: number;
  difficulty: number;
};

type RecipesFilters = {
  categoryId?: string | null;
  searchQuery?: string | null;
};

interface RecipesSliceState {
  items: RecipeItem[];
  status: RecipeStatus | "";
}

export const fetchRecipes = createAsyncThunk<
  RecipeItem[],
  RecipesFilters | undefined
>("recipes/fetchRecipes", async (props) => {
  const category = props?.categoryId ? `category=${props.categoryId}` : "";
  const search = props?.searchQuery ? `&search=${props.searchQuery}` : "";
  const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`;
  const response = await axios.get<RecipeItem[]>(url);
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
        state.status = RecipeStatus.LOADING;
        state.items = [];
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<RecipeItem[]>) => {
          state.status = RecipeStatus.SUCCESS;
          state.items = action.payload;
        },
      )
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = RecipeStatus.ERROR;
        state.items = [];
      });
  },
});

export const selectRecipes = (state: RootState) => state.recipes;
export const { setItems } = recipesSlice.actions;
export default recipesSlice.reducer;

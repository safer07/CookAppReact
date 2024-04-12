import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState: INewFullRecipeItem = {
  name: "",
  category: "",
  img: "",
  time: NaN,
  difficulty: NaN,
  description: "",
  totalIngredients: [],
  steps: [],
};

const createRecipeSlice = createSlice({
  name: "createRecipe",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setImg(state, action: PayloadAction<string>) {
      state.img = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    setDifficulty(state, action: PayloadAction<number>) {
      state.difficulty = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setSteps(state, action: PayloadAction<RecipeStep[]>) {
      // TODO: здесь надо автоматом считать totalIngredients
      state.steps = action.payload;
    },
    resetCreateRecipe: () => initialState,
  },
});

export const selectCreateRecipe = (state: RootState) => state.createRecipe;
export const {
  setName,
  setCategory,
  setImg,
  setTime,
  setDifficulty,
  setDescription,
  setSteps,
  resetCreateRecipe,
} = createRecipeSlice.actions;
export default createRecipeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState: INewFullRecipeItem = {
  name: "",
  category: "",
  img: "",
  time: 0,
  timeHours: null,
  timeMinutes: null,
  difficulty: 0,
  description: "",
  totalIngredients: [],
  steps: [],
};

function calcTime(hours: number | null, minutes: number | null): number {
  let h = hours || 0;
  let m = minutes || 0;
  return h * 60 + m;
}

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
    // setTime(state, action: PayloadAction<number>) {
    //   state.time = action.payload;
    // },
    setTimeHours(state, action: PayloadAction<number>) {
      state.timeHours = action.payload;
      state.time = calcTime(state.timeHours, state.timeMinutes);
    },
    setTimeMinutes(state, action: PayloadAction<number>) {
      state.timeMinutes = action.payload;
      state.time = calcTime(state.timeHours, state.timeMinutes);
    },
    setDifficulty(state, action: PayloadAction<number>) {
      state.difficulty = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setTotalIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.totalIngredients = action.payload;
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
  setTimeHours,
  setTimeMinutes,
  setDifficulty,
  setDescription,
  setTotalIngredients,
  setSteps,
  resetCreateRecipe,
} = createRecipeSlice.actions;
export default createRecipeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface NavBarSliceState {
  activeTab: number;
  show: boolean;
}

const initialState: NavBarSliceState = {
  activeTab: 0,
  show: true,
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    setShowNavBar(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
  },
});

export const selectNavBar = (state: RootState) => state.navBar;
export const { setActiveTab, setShowNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;

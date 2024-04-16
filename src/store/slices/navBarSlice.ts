import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type NavBarTabs = "recipes" | "profile";

interface NavBarSliceState {
  activeTab: NavBarTabs;
}

const initialState: NavBarSliceState = {
  activeTab: "recipes",
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    setActiveNavBarTab(state, action: PayloadAction<NavBarTabs>) {
      state.activeTab = action.payload;
    },
  },
});

export const selectNavBar = (state: RootState) => state.navBar;
export const { setActiveNavBarTab } = navBarSlice.actions;
export default navBarSlice.reducer;

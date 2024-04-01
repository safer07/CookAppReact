import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 0,
  show: true,
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setShowNavBar(state, action) {
      state.show = action.payload;
    },
  },
});

export const selectNavBar = (state) => state.navBar;
export const { setActiveTab, setShowNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;

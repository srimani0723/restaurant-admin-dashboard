import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menuitems",
  initialState: {
    menuList: [],
    activePage: "Dashboard",
    toggleView: false,
  },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    toggleNavbarView: (state) => {
      state.toggleView = !state.toggleView;
    },
  },
});

export const { setActivePage, toggleNavbarView } = menuSlice.actions;

export default menuSlice.reducer;

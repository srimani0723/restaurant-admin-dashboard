import { createSlice } from "@reduxjs/toolkit";

const list = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Search",
    path: "/search",
  },
  {
    name: "Cart",
    path: "/cart",
  },
];

const validateActivePagePath = (pathname) => {
  const path = pathname;
  const currentPage = list.find((item) => item.path === path);
  return currentPage?.name || "Dashboard";
};

const menuSlice = createSlice({
  name: "menuitems",
  initialState: {
    menuList: [],
    activePage: validateActivePagePath(window.location.pathname),
    toggleView: false,
    minPrice: "",
    maxPrice: "",
    selectedCategory: "All",
    isAvailable: true,
  },
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    toggleNavbarView: (state) => {
      state.toggleView = !state.toggleView;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setIsAvailable: (state, action) => {
      state.isAvailable = action.payload;
    },
  },
});

export const {
  setActivePage,
  toggleNavbarView,
  setMinPrice,
  setMaxPrice,
  setSelectedCategory,
  setIsAvailable,
} = menuSlice.actions;

export default menuSlice.reducer;

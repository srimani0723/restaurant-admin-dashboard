import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: "",
  ingredients: "",
  preparationTime: "",
  isAvailable: "",
  image: "",
  viewMenuForm: false,
  existingMenu: null,
};

const menuFormSlice = createSlice({
  name: "menuForm",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setPreparationTime: (state, action) => {
      state.preparationTime = action.payload;
    },
    setIsAvailable: (state, action) => {
      state.isAvailable = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    toggleMenuFormView: (state) => {
      state.viewMenuForm = !state.viewMenuForm;
    },
    setExistingMenu: (state, action) => {
      state.existingMenu = action.payload;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.category = action.payload.category;
      state.price = action.payload.price;
      state.ingredients = action.payload.ingredients;
      state.preparationTime = action.payload.preparationTime;
      state.isAvailable = action.payload.isAvailable;
      state.image = action.payload.imageUrl;
    },
    clearExistingMenu: (state) => {
      return initialState;
    },
  },
});

export const {
  setName,
  setDescription,
  setCategory,
  setPrice,
  setIngredients,
  setPreparationTime,
  setIsAvailable,
  setImage,
  toggleMenuFormView,
  setExistingMenu,
  clearExistingMenu,
} = menuFormSlice.actions;

export default menuFormSlice.reducer;

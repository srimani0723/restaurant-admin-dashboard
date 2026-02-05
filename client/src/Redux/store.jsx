import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./MenuSlice";
import menuFormReducer from "./menuFormSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    menuForm: menuFormReducer,
    cart: cartReducer,
  },
});

export default store;

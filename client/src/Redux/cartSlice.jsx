import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  checkOutFormView: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.cartList.find(
        (item) => item._id === action.payload._id,
      );
      if (exist) {
        state.cartList = state.cartList.map((item) => {
          if (item._id === action.payload._id) {
            item.quantity += 1;
          }
          return item;
        });
      } else {
        state.cartList = [
          ...state.cartList,
          { ...action.payload, quantity: 1 },
        ];
      }
    },
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    changeQuantity: (state, action) => {
      console.log(action.payload);
      const { productId, quantity } = action.payload;
      state.cartList = state.cartList.map((item) => {
        if (item._id === productId) {
          console.log(item.quantity);
          item.quantity = quantity;
        }
        return item;
      });
    },
    toggleCheckOutFormView: (state) => {
      state.checkOutFormView = !state.checkOutFormView;
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  toggleCheckOutFormView,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

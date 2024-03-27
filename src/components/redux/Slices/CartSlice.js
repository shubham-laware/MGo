// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    snackbar: {
      message: '',
      open: false,
      index: -1,
    },
    totalQuantity: 0, // Add totalQuantity to the initial state
  },
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.items.findIndex(item => item.product_id === action.payload.product_id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart(state, action) {
      const index = state.items.findIndex(item => item.product_id === action.payload.product_id);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
    addQuantity(state, action) {
      const { product_id } = action.payload;
      const existingItem = state.items.find(item => item.product_id === product_id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
    deleteQuantity(state, action) {
      const { product_id } = action.payload;
      const existingItem = state.items.find(item => item.product_id === product_id);
      if (existingItem) {
        // Ensure the quantity doesn't go below 1
        existingItem.quantity = Math.max(existingItem.quantity - 1, 1);
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
    showSnackbar(state, action) {
      const { message, index } = action.payload;
      state.snackbar = { message, open: true, index };
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
 
});

export const { addToCart ,removeFromCart,addQuantity,deleteQuantity,showSnackbar, hideSnackbar} = cartSlice.actions;

// Selector function to compute the total quantity
export const selectTotalQuantity = state => state.cart.totalQuantity;

export default cartSlice.reducer;

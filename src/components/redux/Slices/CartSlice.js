// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.findIndex(item => item.product_id === action.payload.product_id);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const index = state.findIndex(item => item.product_id === action.payload.product_id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addQuantity(state, action) {
      const { product_id } = action.payload;
      const existingItem = state.find(item => item.product_id === product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    deleteQuantity(state, action) {
      const { product_id } = action.payload;
      const existingItem = state.find(item => item.product_id === product_id);
      if (existingItem) {
        // Ensure the quantity doesn't go below 1
        existingItem.quantity = Math.max(existingItem.quantity - 1, 1);
      }
    },
  },
 
});

export const { addToCart ,removeFromCart,addQuantity,deleteQuantity} = cartSlice.actions;
export default cartSlice.reducer;

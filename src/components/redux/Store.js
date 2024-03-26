// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/CartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});

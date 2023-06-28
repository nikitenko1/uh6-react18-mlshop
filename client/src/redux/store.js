import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import adminSlice from "./slices/adminSlice";
import productSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userSlice,
    cart: cartSlice,
    product: productSlice,
    admin: adminSlice,
    order: orderSlice,
  },
});

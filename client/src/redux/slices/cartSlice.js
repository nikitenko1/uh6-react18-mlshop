const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existProduct = state.cart.some((p) => p._id === action.payload._id);
      if (!existProduct) {
        return { cart: [...state.cart, action.payload] };
      } else {
        const checkExits = state.cart.some(
          (p) => p.colors === action.payload.colors && p.memories === action.payload.memories
        );
        if (!checkExits) {
          return { cart: [...state.cart, action.payload] };
        } else {
          const newCart = state.cart.map((p) => {
            if (p.colors === action.payload.colors && p.memories === action.payload.memories) {
              return {
                ...p,
                quantity: p.quantity + 1,
              };
            }
            return p;
          });
          return { cart: newCart };
        }
      }
    },
    increase: (state, action) => {
      const newCart = state.cart.map((p) => {
        if (p.colors + p.memories === action.payload.key) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      return { cart: newCart };
    },
    decrease: (state, action) => {
      const newCart = state.cart.map((p) => {
        if (p.colors + p.memories === action.payload.key) {
          return p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p;
        }
        return p;
      });
      return { cart: newCart };
    },
    deleteCart: (state, action) => {
      const newCart = state.cart.filter((p) => p.colors + p.memories !== action.payload);
      return { cart: newCart };
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", null);
    },
  },
});

export const { addToCart, increase, decrease, deleteCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

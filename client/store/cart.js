import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//need different paths for users and guests
//need some way to check if an added item is already in cart and update quantity instead (possibly in component?)

// Async Think
export const fetchUserCart = createAsyncThunk(
  "/cart/fetchCartItems",
  async () => {
    try {
      let response;
      if (productInfo) {
        const { limit, offset, filterCategory, filter, order, scale } =
          productInfo;
        response = await axios.get(
          `/api/products?limit=${limit}&offset=${offset}&filterCategory=${filterCategory}&filter=${filter}&order=${order}&scale=${scale}`
        );
      } else {
        response = await axios.get("/api/products");
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      // can take parameters from async f(X) above and {getState, extra} as last parameter
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

const initialState = {
  cartItems: [],
  quantityTotal: 0,
  priceTotal: 0,
  isLoading: true,
};

// Create Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = state.cartItems.push(action.payload);
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id: itemId, quantity } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.quantity = quantity;
    },
    clearCart: (state, action) => {
      return initialState;
    },
    calcTotals: (state, action) => {
      let quantityTotal = (priceTotal = 0);
      state.cartItems.forEach((item) => {
        quantityTotal += item.quantity;
        priceTotal += item.price * item.quantity;
      });
      state.quantityTotal = quantityTotal;
      state.priceTotal = priceTotal;
    },
  },
  // //   extraReducers: (builder) => {
  // //     builder
  // //       .addCase(fetchProducts.pending, (state, action) => state)
  // //       .addCase(fetchProducts.fulfilled, (state, action) => action.payload)
  // //       .addCase(fetchProducts.rejected, (state, action) => state);
  //   }, // you can add more .addCase as you need
});

export default cartSlice.reducer;
const addItem = cartSlice.actions.addItem;
export { addItem };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN = "token";

//need different paths for users and guests

////// Async Thunks

// get all items for logged in users
export const fetchCartUser = createAsyncThunk(
  "/cart/fetchCartItems",
  async () => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.get("/api/cartItems", {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

// add item for logged in user
export const addItemUser = createAsyncThunk(
  "/cart/addItemUser",
  async ({ productId, quantity, runFetch }, { dispatch }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const item = await axios.post(
        "/api/cartItems",
        {
          productId,
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (runFetch) {
        await dispatch(fetchCartUser());
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

// update item quantity for logged in user
export const updateQuantityUser = createAsyncThunk(
  "/cart/updateQuantityUser",
  async ({ cartId, quantity }, { dispatch }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const item = await axios.put(
        `/api/cartItems/${cartId}`,
        {
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      await dispatch(fetchCartUser());
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

// delete item for logged in user
export const deleteItemUser = createAsyncThunk(
  "/cart/deleteItemUser",
  async (cartId, { dispatch }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/cartItems/${cartId}`, {
        headers: {
          authorization: token,
        },
      });
      await dispatch(fetchCartUser());
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

// clear cart for logged in user
export const clearCartUser = createAsyncThunk(
  "/cart/clearCartUser",
  async (_props, { dispatch }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/cartItems`, {
        headers: {
          authorization: token,
        },
      });
      await dispatch(fetchCartUser());
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: () => {
      const token = window.localStorage.getItem("token");
      if (token === null) {
        return false;
      }
    },
  }
);

// Initial State
const initialState = {
  cartItems: [],
  quantityTotal: 0,
  priceTotal: 0,
  isLoading: false,
};

// Create Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLocal: (state, action) => {
      const cartJSON =
        window.localStorage.getItem("cartItems") ||
        JSON.stringify(state.cartItems);
      if (cartJSON) {
        state.cartItems = JSON.parse(cartJSON);
      } else {
        state.cartItems = [];
      }
    },
    saveCartLocal: (state, action) => {
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addItemGuest: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    deleteItemGuest: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateQuantityGuest: (state, action) => {
      const { id: itemId, quantity } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.quantity = +quantity;
    },
    clearCartGuest: (state, action) => {
      return initialState;
    },
    calcTotals: (state, action) => {
      let quantityTotal = 0;
      let priceTotal = 0.00;
      if (state.cartItems) {
        state.cartItems.forEach((item) => {
          quantityTotal += item.quantity;
          priceTotal += Number(item.product.displayPrice) * item.quantity;
        });
      }
      state.quantityTotal = quantityTotal;
      state.priceTotal = Math.round(priceTotal * 100)/100 ;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCartUser.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCartUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addItemUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addItemUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateQuantityUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateQuantityUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteItemUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteItemUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(clearCartUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clearCartUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
const setCartLocal = cartSlice.actions.setCartLocal;
const saveCartLocal = cartSlice.actions.saveCartLocal;
const addItemGuest = cartSlice.actions.addItemGuest;
const deleteItemGuest = cartSlice.actions.deleteItemGuest;
const updateQuantityGuest = cartSlice.actions.updateQuantityGuest;
const clearCartGuest = cartSlice.actions.clearCartGuest;
const calcTotals = cartSlice.actions.calcTotals;
export {
  setCartLocal,
  saveCartLocal,
  addItemGuest,
  deleteItemGuest,
  updateQuantityGuest,
  clearCartGuest,
  calcTotals,
};

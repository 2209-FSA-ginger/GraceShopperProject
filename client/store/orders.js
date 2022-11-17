import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN = "token";

// Async Thunk

// get all orders for logged in users
export const fetchOrders = createAsyncThunk(
  "/orders/fetchOrders",
  async (userId) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.get(`/api/orders/history/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      // console.log("ORDER RES", response.data);
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

// Create Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: [],

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => state)
      .addCase(fetchOrders.fulfilled, (state, action) => action.payload)
      .addCase(fetchOrders.rejected, (state, action) => state);
  }, // you can add more .addCase as you need
});

export default orderSlice.reducer;

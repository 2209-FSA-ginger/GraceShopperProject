import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk
export const fetchSingleProduct = createAsyncThunk(
  `/products/fetchSingleProduct`,
  async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Create Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    album: {},
    tracklist: [],
  },
  reducers: {
    setTracklist: (state, action) => {
      state.album.tracklist
        ? (state.tracklist = state.album.tracklist.split(","))
        : (state.tracklist = []);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchSingleProduct.pending, (state, action) => state)
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.album = action.payload;
      });
    // .addCase(fetchSingleProduct.rejected, (state, action) => state);
  }, // you can add more .addCase as you need
});

export default productSlice.reducer;
const setTracklist = productSlice.actions.setTracklist;
export { setTracklist };

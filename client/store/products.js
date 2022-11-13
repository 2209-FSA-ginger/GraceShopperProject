import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
// const initialState = {
//   products: [],
//   status: "idle",
// };

// Async Think
export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async (productInfo) => {
    try {
      let response
      if(productInfo){
        const {limit, offset, filterCategory, filter, order, scale} = productInfo
        response = await axios.get(`/api/products?limit=${limit}&offset=${offset}&filterCategory=${filterCategory}&filter=${filter}&order=${order}&scale=${scale}`);
      } else {
        response = await axios.get("/api/products");
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Create Slice
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => state)
      .addCase(fetchProducts.fulfilled, (state, action) => action.payload)
      .addCase(fetchProducts.rejected, (state, action) => state);
  }, // you can add more .addCase as you need
});

export default productsSlice.reducer;
const setProducts = productsSlice.actions.setProducts;
export { setProducts };

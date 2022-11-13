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
      let endpoint = "/api/products"
      if(productInfo){
        endpoint += "?"
        const {limit, offset, filterCategory, filter, order, scale} = productInfo

        if(limit){
            endpoint += `limit=${limit}`
        } 

        if(offset){
          endpoint[endpoint.length - 1] === "?" ?
            endpoint += `offset=${offset}`:
            endpoint += `&offset=${offset}`
        }

        if(filterCategory){
          endpoint[endpoint.length - 1] === "?" ?
            endpoint += `filterCategory=${filterCategory}`:
            endpoint += `&filterCategory=${filterCategory}`
        }

        if(filter){
          endpoint[endpoint.length - 1] === "?" ?
          endpoint += `filter=${filter}`:
          endpoint += `&filter=${filter}`
        }

        if(order){
          endpoint[endpoint.length - 1] === "?" ?
            endpoint += `order=${order}`:
            endpoint += `&order=${order}`
        }

        if(scale){
          endpoint[endpoint.length - 1] === "?" ?
            endpoint += `scale=${scale}`:
            endpoint += `&scale=${scale}`
        }

        response = await axios.get(endpoint);
      } else {
        response = await axios.get(endpoint);
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

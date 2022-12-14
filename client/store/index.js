// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import auth from './auth'

// const reducer = combineReducers({ auth })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './auth'

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import checkoutSlice from "./checkout";
import orderReducer from "./orders";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: loginSlice,
    products: productsReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    checkout: checkoutSlice,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "./auth";

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

import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "./auth"
import logger from "redux-logger"

const store = configureStore({
  reducer:{
    auth: loginSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store
export * from './auth'
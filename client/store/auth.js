import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

export const me = createAsyncThunk(
  "users/attemptLogin", 
  async () => {
      const token = window.localStorage.getItem(TOKEN)
      console.log(token);
      const res = await axios.get('/auth/me', {
              headers: {
                authorization: token
              }
            })
      return res.data
  },
  {
      condition: () => { // can take parameters from async f(X) above and {getState, extra} as last parameter
          const token = window.localStorage.getItem("token")
          if(token === null){
              return false
          }
  }})

export const authenticate = createAsyncThunk(
  "users/authenticate",
  async (submitInfo, {dispatch}) => {
      const {firstName, lastName, email, username, password, method} = submitInfo
      let res
      if(method === "signup"){
        res = await axios.post(`/auth/signup`, {firstName, lastName, username, password, email})
      } else if (method === "login"){
        res = await axios.post(`/auth/login`, {username, password})
      }
      window.localStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
  }
)

export const updateInfo  = createAsyncThunk(
  "users/update",
  async (submitInfo) => {
    try{
      console.log("INFO IS HERE", submitInfo)
      const token = window.localStorage.getItem(TOKEN)
      const {userId} = submitInfo
      const {data} = await axios.put(`/api/users/${userId}`, submitInfo, {headers: {authorization: token}})
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

//INITIAl STATE
const initialState = {} //{username: "", password:""}

//Create Slice
const loginSlice = createSlice({
  name: "login",
  initialState, // you can omit reducers property if you're not using it,
  reducers: {
       logout: () => {
           window.localStorage.removeItem("token")
           window.localStorage.removeItem("cart")
           return {}
       }
  },
  extraReducers: (builder) => {
   builder
       .addCase(authenticate.rejected, (state, action) => action.payload)
       .addCase(me.pending, (state, action) => state)
       .addCase(me.fulfilled, (state, action) => action.payload)
       .addCase(me.rejected, (state, action) => state)
   } // you can add more .addCase as you need
})

export const {logout} = loginSlice.actions
export default loginSlice.reducer

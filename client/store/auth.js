import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
//  * ACTION TYPES
//  */
// const SET_AUTH = 'SET_AUTH'

// /**
//  * ACTION CREATORS
//  */
// const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {
//   const token = window.localStorage.getItem(TOKEN)
//   if (token) {
//     const res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token
//       }
//     })
//     return dispatch(setAuth(res.data))
//   }
// }

export const me = createAsyncThunk(
  "users/attemptLogin", 
  async () => {
      const token = window.localStorage.getItem(TOKEN)
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


// export const authenticate = (username, password, method) => async dispatch => {
//   try {
//     const res = await axios.post(`/auth/${method}`, {username, password})
//     window.localStorage.setItem(TOKEN, res.data.token)
//     dispatch(me())
//   } catch (authError) {
//     return dispatch(setAuth({error: authError}))
//   }
// }

export const authenticate = createAsyncThunk(
  "users/authenticate",
  async (username, password, method, dispatch, {rejectWithValue}) => {
    try{
      const res = await axios.post(`/auth/${method}`, {username, password})
      window.localStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
    } catch (authError){
      return rejectWithValue(authError)
    }
  }
)

// export const logout = () => {
//   window.localStorage.removeItem(TOKEN)
//   history.push('/login')
//   return {
//     type: SET_AUTH,
//     auth: {}
//   }
// }

/**
 * REDUCER
 */
// export default function(state = {}, action) {
//   switch (action.type) {
//     case SET_AUTH:
//       return action.auth
//     default:
//       return state
//   }
// }

//INITIAl STATE
const initialState = null //{username: "", password:""}

//Create Slice
const loginSlice = createSlice({
  name: "login",
  initialState, // you can omit reducers property if you're not using it,
  reducers: {
       logout: () => {
           window.localStorage.removeItem("token")
           return null
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

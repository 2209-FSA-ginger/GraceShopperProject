import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";

const TOKEN = "token";

export const getMe = createAsyncThunk(
  "users/attemptLogin",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return res.data;
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

export const authenticate = createAsyncThunk(
  "users/authenticate",
  async (submitInfo, { dispatch }) => {
    const { firstName, lastName, email, username, password, method } =
      submitInfo;
    let res;
    if (method === "signup") {
      res = await axios.post(`/auth/signup`, {
        firstName,
        lastName,
        username,
        password,
        email,
      });
    } else if (method === "login") {
      res = await axios.post(`/auth/login`, { username, password });
    }
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(getMe());
  }
);

export const updateInfo = createAsyncThunk(
  "users/update",
  async (submitInfo, { dispatch }) => {
    try {
      const { userId } = submitInfo;
      const { data } = await axios.put(`/api/users/${userId}`, submitInfo);
      dispatch(getMe());
    } catch (error) {
      console.log(error);
    }
  }
);

//INITIAl STATE
const initialState = {
  me: {}, //{username: "", password:""}
  isLoggedIn: false,
};

//Create Slice
const loginSlice = createSlice({
  name: "login",
  initialState, // you can omit reducers property if you're not using it,
  reducers: {
    logout: () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("cart");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(getMe.pending, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.me = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoggedIn = false;
      });
  }, // you can add more .addCase as you need
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

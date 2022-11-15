import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const TOKEN = "token"

export const getUserInfo = createAsyncThunk(
    "users/getUserInfo", 
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

const initialState = {}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducer: {
        updateCheckoutInfo: (state, action) => {
           const {firstName, lastName, addressLine1, city, country } = action.payload
           if(firstName) state.firstName = firstName
           if(lastName) state.lastName = lastName
           if(addressLine1) state.addressLine1 = addressLine1
           if(city) state.city = city
           if(country) state.country = country
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.fulfilled, (state, action) => {
                const {firstName, lastName, addressLine1, city, country} = action.payload
                return {firstName, lastName, addressLine1, city, country}
            })
    }
})

export const {updateCheckoutInfo} = checkoutSlice.actions
export default checkoutSlice.reducer
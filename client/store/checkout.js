import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const TOKEN = "token"


export const createPaymentSession = createAsyncThunk(
    "checkout/paymentSession",
    async (productInfo) => {
        try{
            const { data } = await axios.post("http://localhost:8080/api/payment/session", productInfo)
            return data
        } catch (error){
            console.log(error)
        }
    }
)

export const placeOrder = createAsyncThunk(
    "checkout/placeOrder",
    async(checkoutInfo) => {
        try {
            const {data} = await axios.post("/api/orders", checkoutInfo)
            console.log(data)
            return data
        } catch(error) {
            console.log(error)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    "checkout/getUserInfo", 
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

const initialState = {}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        updateCheckoutInfo: (state, action) => {
            if(action.payload.creditCard){
                state.creditCard = action.payload.creditCard
            } else {
                return action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.fulfilled, (state, action) => {
                const newState = {}
                for(let keys in action.payload){
                    if(keys !== "id" && keys !== "username" && keys !== "password" && keys !== "phone" && keys !== "isAdmin" && keys !== "createdAt" && keys !== "updatedAt" ){
                        newState[keys] = action.payload[keys]
                    }
                }
                return newState
            })
    }
})

export const {updateCheckoutInfo} = checkoutSlice.actions
export default checkoutSlice.reducer
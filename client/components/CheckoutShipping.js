import React from "react"
import { useDispatch } from "react-redux"
import { updateCheckoutInfo } from "../store/checkout"

const CheckoutShipping = () => {

const dispatch = useDispatch()

const handleSubmit = event => {
    event.handleDefault()
    const submitInfo = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        addressLine1: event.target.addressLine1.value,
        city: event.target.city.value,
        country: event.target.city.value
    }
    dispatch(updateCheckoutInfo(submitInfo))

}



return (
    <form id="checkoutForm" onSubmit={(handleSubmit)}>  
        <div>
            <label>First Name:</label>
            <input name="firstName" type="text"></input>
            <label>Last Name:</label>
            <input name="lastName" type="text"></input>
        </div>
        <div>
            <label>Email:</label>
            <input name="email" type="text"></input>
            <label>Address:</label>
            <input name="addressLine1" type="text"></input>
        </div>
        <div>
            <label>City:</label>
            <input name="city" type="text"></input>
            <label>Country:</label>
            <input name="country" type="text"></input>
        </div>
        <div>
            <button type="submit">Save</button>
        </div>
    </form>
)

}

export default CheckoutShipping
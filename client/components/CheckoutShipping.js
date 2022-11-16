import React from "react"
import { useDispatch } from "react-redux"
import { updateCheckoutInfo } from "../store/checkout"

const CheckoutShipping = props => {

const dispatch = useDispatch()

const handleSubmit = event => {
    event.preventDefault()
    const submitInfo = {}
    if(event.target.creditCard){
        submitInfo.creditCard = event.target.creditCard.value
        dispatch(updateCheckoutInfo(submitInfo))
    } else {
        submitInfo.firstName = event.target.firstName.value,
        submitInfo.lastName = event.target.lastName.value,
        submitInfo.email = event.target.email.value,
        submitInfo.addressLine1 = event.target.addressLine1.value,
        submitInfo.city = event.target.city.value,
        submitInfo.state = event.target.state.value,
        submitInfo.zipcode = event.target.zipcode.value,
        submitInfo.country = event.target.country.value
        }
        dispatch(updateCheckoutInfo(submitInfo))
    }   


if(!props.changeCreditCard){
    return (
        <form id="checkoutForm" onSubmit={handleSubmit}>  
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
                <label>State:</label>
                <input name="state" type="text"></input>
            </div>
            <div>
                <label>Zipcode:</label>
                <input type="number" name="zipcode" min="10000" max="99999"></input>
                <label>Country:</label>
                <input name="country" type="text"></input>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    )
} else {
    return (
        <form id="checkoutForm" onSubmit={handleSubmit}>  
            <div>
                <label>Credit Card:</label>
                <input name="creditCard" type="number" min="1000000000000000" max="9999999999999999"></input>
                <div>
                <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}



}

export default CheckoutShipping
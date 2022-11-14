import React from "react"

const CheckoutShipping = () => {

return (
    <form id="checkoutForm">  
        <div>
            <label>First Name:</label>
            <input></input>
            <label>Last Name:</label>
            <input></input>
        </div>
        <div>
            <label>Email:</label>
            <input></input>
            <label>Address:</label>
            <input></input>
        </div>
        <div>
            <label>City:</label>
            <input></input>
            <label>Country:</label>
            <input></input>
        </div>
        <div>
            <button type="submit">Save</button>
        </div>
    </form>
)

}

export default CheckoutShipping
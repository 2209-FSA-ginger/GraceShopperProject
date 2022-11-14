import React from "react"
import {useSelector} from "react-redux"
import CheckoutShipping from "./CheckoutShipping"

const Checkout = () => {


const isLoggedIn = useSelector( state => state.auth)


return (
    <div id="stepsAndSummary">
        <div id="steps">
            <div className="stepSection">
                <h3>1</h3>
                <h3>Shipping Address</h3>
                <div>
                    {Object.keys(isLoggedIn).length !== 0?
                    <div id="userInfoAndButton">
                        <div>
                        <h4>{`${isLoggedIn.firstName} ${isLoggedIn.lastName}`}</h4>
                        <h4>{isLoggedIn.addressLine1}</h4>
                        <h4>{`${isLoggedIn.city}, ${isLoggedIn.country}`}</h4>
                        <h4></h4>
                        </div>
                        <div>
                            <button type="button">Change</button>
                        </div>
                    </div>:
                    <CheckoutShipping/>
                } 
                </div>
            </div>
            <div className="stepSection">
                <h3>2</h3>
                <h3>Payment Method</h3>
                <div></div>
            </div>
            <div id="reviewItems">
                <h3>Review Items and Shipping</h3>
            </div>
                <h1>step 4</h1>
        </div>
        <div id="summary">
            <h1>summary</h1>
        </div>
    </div>
)

}

export default Checkout
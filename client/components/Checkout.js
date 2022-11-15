import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import CheckoutShipping from "./CheckoutShipping"
import { getUserInfo } from "../store/checkout"

const Checkout = () => {

const dispatch = useDispatch()
const checkoutInfo = useSelector( state => state.checkout)
const isLoggedIn = useSelector(state => state.auth)
const cart = useSelector( state => state.cart)

const [getView, setView] = useState("normal")

useEffect(() => {
    dispatch(getUserInfo())
}, [])


const changeBillingInfo = () => {
    setView("changeInfo")
}

const checkout = () => {
    //add to orderprooducts
    

}



return (
    <div id="stepsAndSummary">
        <div id="steps">
            <div className="stepSection">
                <h3>1</h3>
                <h3>Shipping Address</h3>
                <div>
                    {Object.keys(checkoutInfo).length !== 0 && checkoutInfo.addressLine1 && checkoutInfo.city && checkoutInfo.country && getView === "normal" ?
                    <div id="userInfoAndButton">
                        <div>
                        <h4>{`${checkoutInfo.firstName} ${checkoutInfo.lastName}`}</h4>
                        <h4>{checkoutInfo.addressLine1}</h4>
                        <h4>{`${checkoutInfo.city}, ${checkoutInfo.country}`}</h4>
                        <h4></h4>
                        </div>
                        <div>
                            <button type="button" onClick={changeBillingInfo}>Change</button>
                        </div>
                    </div>:
                    <CheckoutShipping isLogggedIn={isLoggedIn}/>
                } 
                </div>
            </div>
            <div className="stepSection">
                <h3>2</h3>
                <h3>Payment Method</h3>
                <div></div>
            </div>
            <div id="review">
                <div id="reviewTitle">
                    <h3> 3 </h3>
                    <h3>Review Items and Shipping</h3>
                    <div>
                    </div>
                </div>
                {cart.cartItems.map(item => (
                    <div className="reviewItems" key={item.id}>
                        <div>
                            <img src={item.product.imageURL}/>
                        </div>
                        <div className="reviewProductDescription">
                            <h4>{item.product.title}</h4>
                            <h5>{item.product.artist}</h5>
                            <h5>{`$${item.product.displayPrice}`}</h5>
                            <h5>Quantity: {item.quantity}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <div id="placeOrder">
                <button id="orderButton" onClick={checkout}>Place Order</button>
                <div>
                    <h3>Order Total: {`$${cart.priceTotal}`}</h3>
                </div>
            </div>
        </div>
        <div id="summary">
            <h1>Summary</h1>
        </div>
    </div>
)

}

export default Checkout
import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearCartGuest, clearCartUser} from "../store/cart";
import { placeOrder } from "../store/checkout";

const ConfirmationPage = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {me, isLoggedIn} = useSelector(state => state.auth)
    const products = []
    const [getRender, setRender] = useState("first")

    useEffect(() => {
        setRender("second")
    }, [])
  

    if(cart.cartItems.length > 0 && getRender === "second")
    {
        cart.cartItems.forEach(item => {
            products.push({quantity: item.quantity,
                            price: item.product.displayPrice,
                            productId: item.product.id})
        })

        const checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"))
        const order = {...checkoutInfo}
        localStorage.removeItem("checkoutInfo")
        if (order.creditCard === undefined) order.creditCard = me.creditCard
        order.userId = me.id

        if(Object.keys(order).length >= 10){
            const checkoutObj = {order, products}
            console.log(checkoutObj)
            dispatch(placeOrder(checkoutObj))
            dispatch(clearCartGuest())
            dispatch(clearCartUser())
        }
    }

    return(
        <div>
            {cart.cartItems ? 
            <div>
                <div>
                    <h1>Order Has Been Placed Successfully!!</h1>
                </div>
                {isLoggedIn ? 
                    <Link to="/home">
                        <button type="button">Click here to go back to your profile</button>
                    </Link>:
                    <Link to="/">
                        <button type="buton">Click here to go back to the homepage</button>
                    </Link>
                
            
            }
                
            </div>:
            <h1>Confirming Payment</h1>
            }
        </div>
    )
}

export default ConfirmationPage
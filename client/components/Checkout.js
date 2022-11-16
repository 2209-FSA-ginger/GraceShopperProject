import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutShipping from "./CheckoutShipping";
import { getUserInfo, createPaymentSession } from "../store/checkout";

const Checkout = () => {
  const dispatch = useDispatch();

  const checkoutInfo = useSelector((state) => state.checkout);
  const cart = useSelector((state) => state.cart);

  const [getShippingInfo, setShippingInfo] = useState(false);
  const [getBillingInfo, setBillingInfo] = useState(false);
  const [getPaymentScreen, setPaymentScreen] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    setShippingInfo(false)
    setBillingInfo(false)
    setPaymentScreen(false)
  }, [checkoutInfo])

  const changeView = (event) => {
    if(event.target.name === "shippingInfo"){
      setShippingInfo(true);
    } else if(event.target.name === "billingInfo"){
      setBillingInfo(true);
    } 
  };

  const checkout = async () => {
    setPaymentScreen(true);
    const finalCheckoutInfo = {...checkoutInfo}
    localStorage.setItem("checkoutInfo", JSON.stringify(finalCheckoutInfo))
    const products = []
    cart.cartItems.forEach(item => {
      products.push({
        quantity: item.quantity,
        price: item.product.price,
        name: item.product.title,
        images: [item.product.imageURL]
      })
    } )

    const paymentSite = await dispatch(createPaymentSession(products)).unwrap()
    window.location = paymentSite
  };

  return (
    <div id="stepsAndSummary">
      <div id="steps">
        <div className="stepSection">
          <h3>1</h3>
          <h3>Shipping Address</h3>
          <div>
            {Object.keys(checkoutInfo).length !== 0 &&
            checkoutInfo.addressLine1 &&
            checkoutInfo.city &&
            checkoutInfo.country &&
            getShippingInfo === false? (
              <div id="userInfoAndButton">
                <div>
                  <h4>{`${checkoutInfo.firstName} ${checkoutInfo.lastName}`}</h4>
                  <h4>{checkoutInfo.addressLine1}</h4>
                  <h4>{`${checkoutInfo.city}, ${checkoutInfo.state}, ${checkoutInfo.zipcode}`}</h4>
                  <h4>{`${checkoutInfo.country}`}</h4>
                </div>
                <div>
                  <button type="button" name="shippingInfo" onClick={changeView}>
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <CheckoutShipping/>
            )}
          </div>
        </div>
        <div className="stepSection">
          <h3>2</h3>
          <h3>Payment Method</h3>
          <div>
            {checkoutInfo.creditCard && getBillingInfo === false ?
            <div>
            <h2>Credit Card: {checkoutInfo.creditCard}</h2>
            <button onClick={changeView} name="billingInfo">Change</button>
            </div>:
            <CheckoutShipping changeCreditCard={true}/>
          }
          </div>
        </div>
        <div id="review">
          <div id="reviewTitle">
            <h3> 3 </h3>
            <h3>Review Items and Shipping</h3>
            <div></div>
          </div>
          {cart.isLoading === false && Array.isArray(cart.cartItems)  ? cart.cartItems.map((item) => (
            <div className="reviewItems" key={item.id}>
              <div>
                <img src={item.product.imageURL} />
              </div>
              <div className="reviewProductDescription">
                <h4>{item.product.title}</h4>
                <h5>{item.product.artist}</h5>
                <h5>{`$${item.product.displayPrice}`}</h5>
                <h5>Quantity: {item.quantity}</h5>
              </div>
            </div>
          )):
          <h1>Loading Cart...</h1>}
        </div>
      </div>
      <div id="summary">
        {getPaymentScreen === false ?
        <div>
          <h1>Summary</h1>
          <div>
              <h3>Order Total: {`$${cart.priceTotal}`}</h3>
          </div>
          <button id="orderButton" onClick={checkout} name="paymentScreen">
              Proceed To Payment Screen
          </button>
        </div> :
        <h1>Loading Payment Screen...</h1>
      }
      </div>
    </div>
  );
};

export default Checkout;

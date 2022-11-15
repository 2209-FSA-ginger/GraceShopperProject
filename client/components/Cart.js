import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCartUser, clearCartGuest } from "../store/cart";

const Cart = () => {
  const { cartItems, quantityTotal, priceTotal, isLoading } = useSelector(
    (store) => store.cart
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (quantityTotal === 0) {
    return <h1>Cart is Empty</h1>;
  }

  return (
    <div className="cart">
      <div className="cartDisplay">
        <h1>Shopping Cart</h1>
        {cartItems.map((cartItem) => {
          return <CartItem cartItem={cartItem} key={cartItem.id} />;
        })}
      </div>
      <hr />
      <h3> Total Items: {quantityTotal}</h3>
      <h3>Total Order Price: ${priceTotal}</h3>
      <button
        onClick={(evt) => {
          if (isLoggedIn) {
            dispatch(clearCartUser());
          } else {
            dispatch(clearCartGuest());
          }
        }}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;

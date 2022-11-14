import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import {
  fetchCartUser,
  addItemUser,
  updateQuantityUser,
  deleteItemUser,
  clearCartUser,
  setCartLocal,
  addItemLocal,
  deleteItemLocal,
  updateQuantityLocal,
  clearCartLocal,
  calcTotals,
} from "../store/cart";

const Cart = () => {
  const { cartItems, quantityTotal, priceTotal, isLoading } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (quantityTotal === 0) {
    return <h1>Cart is Empty</h1>;
  }

  return (
    <div className="cartDisplay">
      <h1>Shopping Cart</h1>
      {cartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} key={cartItem.id} />;
      })}
    </div>
  );
};

export default Cart;

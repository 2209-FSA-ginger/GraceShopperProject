import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantityUser,
  deleteItemUser,
  updateQuantityGuest,
  deleteItemGuest,
} from "../store/cart";

const CartItem = (props) => {
  const { cartItem } = props;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formQuantity, setFormQuantity] = useState(`${cartItem.quantity}`);

  const changeHandler = (evt) => {
    setFormQuantity(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (formQuantity === "0") {
      if (isLoggedIn) {
        dispatch(deleteItemUser(cartItem.id));
      } else {
        dispatch(deleteItemGuest(cartItem.id));
      }
    } else {
      if (isLoggedIn) {
        dispatch(
          updateQuantityUser({ cartId: cartItem.id, quantity: +formQuantity })
        );
      } else {
        dispatch(
          updateQuantityGuest({ id: cartItem.id, quantity: formQuantity })
        );
      }
    }
  };

  return (
    <div className="cartItem">
      <img id="cartItem-img" src={cartItem.product.imageURL} />
      <div className="cartItem-text">
        <h4 id="cartItem-title">{cartItem.product.title}</h4>
        <p id="cartItem-artist">{cartItem.product.artist}</p>
        <p id="cartItem-price">Price: ${cartItem.product.displayPrice}</p>
        <p id="cartItem-quantity">Quantity: {cartItem.quantity}</p>
        <p id="cartItem-totalPrice">
          Total: ${cartItem.quantity * cartItem.product.displayPrice}
        </p>
        <button
          onClick={() => {
            if (isLoggedIn) {
              dispatch(deleteItemUser(cartItem.id));
            } else {
              dispatch(deleteItemGuest(cartItem.id));
            }
          }}
        >
          Remove Item
        </button>
        <div className="cart-quantity">
          <form onSubmit={submitHandler}>
            <label htmlFor="quantity">Update Quantity:</label>
            <input
              type="number"
              name="quantity"
              step="1"
              value={formQuantity}
              onChange={changeHandler}
              min="0"
              max={`${cartItem.product.inventory}`}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

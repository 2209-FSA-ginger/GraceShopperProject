import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const CartItem = (props) => {
  const { cartItem } = props;

  const [formQuantity, setFormQuantity] = useState(cartItem.quantity);

  return (
    <div className="cartItem" key={cartItem.id}>
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
            dispatch(deleteItemUser(cartItem.id));
          }}
        >
          Remove Item
        </button>
        <div>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              console.log(evt.target);
              //dispatch(updateQuantityUser(evt.target.value));   /need to set up modularized cart items with local state for forms
            }}
          >
            <label htmlFor="quantity">Update Quantity:</label>
            <input
              type="number"
              name="quantity"
              step="1"
              defaultValue={cartItem.quantity}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

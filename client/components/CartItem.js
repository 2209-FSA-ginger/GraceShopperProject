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
  const dispatch = useDispatch();

  const [formQuantity, setFormQuantity] = useState(cartItem.quantity);

  const changeHandler = (evt) => {
    setFormQuantity(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(
      updateQuantityUser({ cartId: cartItem.id, quantity: formQuantity })
    );
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
            dispatch(deleteItemUser(cartItem.id));
          }}
        >
          Remove Item
        </button>
        <div>
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

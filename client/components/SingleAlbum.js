import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { setTracklist } from "../store/singleProduct";
import { addItemUser, addItemGuest } from "../store/cart";

const SingleAlbum = () => {
  const { album, tracklist } = useSelector((state) => state.singleProduct);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cartQty, setCartQty] = useState(1);

  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  useEffect(() => {
    dispatch(setTracklist());
  }, [album]);

  const changeHandler = (evt) => {
    setCartQty(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (isLoggedIn) {
      dispatch(addItemUser({ productId, quantity: cartQty, runFetch: true }));
    } else {
      dispatch(addItemGuest({ id: album.id, product: album, quantity: cartQty }));
    }
  };

  return (
    <div>
      <ul className="singleAlbum" key={album.id}>
        <img id="album-img" src={album.imageURL} />
        <div className="album-text">
          <h3 id="album-title">{album.title}</h3>
          <p id="album-artist">{album.artist}</p>
          <p id="album-price">{`$${album.price}`}</p>
          <p id="album-inventory">{`Inventory Available: ${album.inventory}`}</p>
          <form onSubmit={submitHandler}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              step="1"
              value={cartQty}
              onChange={changeHandler}
              min="0"
              max={`${album.inventory}`}
            />
            <input type="submit" value="Add to Cart" />
          </form>
          <p>Tracklist</p>
          <div id="album-tracklist">
            {tracklist
              ? tracklist.map((str, i) => {
                  return (
                    <ul className="str-tracklist" key={i}>
                      <div className="str-text">
                        <p id="track-info">{str}</p>
                      </div>
                    </ul>
                  );
                })
              : null}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default SingleAlbum;

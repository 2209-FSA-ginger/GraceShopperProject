import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";

const SingleAlbum = () => {
  const album = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);
  return (
    <div>
      <ul className="singleAlbum" key={album.id}>
        <img id="album-img" src={album.imageURL} />
        <div className="album-text">
          <h3 id="album-title">{album.title}</h3>
          <p id="album-artist">{album.artist}</p>
          <p id="album-price">{`$${album.price}`}</p>
          <p id="album-inventory">{`Quantity: ${album.inventory}`}</p>
          {/* <p>Tracklist</p>
          <p id="album-tracklist">{album.tracklist}</p> */}
        </div>
      </ul>
    </div>
  );
};

export default SingleAlbum;

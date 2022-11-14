import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { setTracklist } from "../store/singleProduct";

const SingleAlbum = () => {
  const { album, tracklist } = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  useEffect(() => {
    dispatch(setTracklist());
  }, [album]);

  return (
    <div>
      <ul className="singleAlbum" key={album.id}>
        <img id="album-img" src={album.imageURL} />
        <div className="album-text">
          <h3 id="album-title">{album.title}</h3>
          <p id="album-artist">{album.artist}</p>
          <p id="album-price">{`$${album.price}`}</p>
          <p id="album-inventory">{`Quantity: ${album.inventory}`}</p>
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

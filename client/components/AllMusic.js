import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, fetchProducts } from "../store/products";

const AllMusic = () => {
  const { payload } = useSelector(setProducts);
  const dispatch = useDispatch();
  //const postStatus = useSelector((state) => state.products.status);

  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchProducts());
  //   }
  // }, [postStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const albums = payload.products;
  //console.log("ALBUMS", albums);
  return (
    <div className="musicList">
      {albums.map((album) => {
        return (
          <ul className="album" key={album.id}>
            <img id="album-img" src={album.imageURL} />
            <div className="album-text">
              <h3 id="album-title">{album.title}</h3>
              <p id="album-artist">{album.artist}</p>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default AllMusic;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, fetchProducts } from "../store/products";

const AllMusic = () => {
  const musicList = useSelector(setProducts);
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

  const albums = musicList.payload.products;
  console.log("ALBUMS", albums);
  return (
    <div className="musicList">
      <h1>Music List</h1>
      {albums.map((album) => {
        return (
          <ul className="album" key={album.id}>
            <img id="album-img" src={album.imageURL} />
            <h3 id="album-title">{album.title}</h3>
            <h4 id="album-artist">{album.artist}</h4>
          </ul>
        );
      })}
    </div>
  );
};

export default AllMusic;

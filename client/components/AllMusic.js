import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

const AllMusic = () => {
  const allAlbums = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="musicList">
      {allAlbums.map((album) => {
        return (
          <ul className="album" key={album.id}>
            <Link to={`/allmusic/${album.id}`}>
              <img id="album-img" src={album.imageURL} />
            </Link>
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

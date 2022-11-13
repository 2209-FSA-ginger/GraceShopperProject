import React from "react";
import { Link } from "react-router-dom";

const FilterColumn = () => {
  return (
    <div className="container">
      <div className="artist-slect">
        <select name="artist" id="artist-select">
          <option value="">Artist</option>
          <option value="">All</option>
        </select>
      </div>
      <div className="genre-select">
        <select name="genre">
          <option value="">Genre</option>
        </select>
      </div>
      <div className="price-select">
        <select name="price">
          <option value="">Price</option>
        </select>
      </div>
    </div>
  );
};

export default FilterColumn;

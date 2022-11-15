import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { clearCartGuest } from "../store/cart";

const Navbar = () => {
  const dispatch = useDispatch();
  const { me, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [filterCategory, setFilterCategory] = useState("all");

  const handleClick = () => {
    dispatch(clearCartGuest());
    dispatch(logout());
    navigate("/");
  };

  const handleFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSearch = (event) => {
    //in event listeners, why don'tw e have to put this in () => {first}
    event.preventDefault();
    navigate(
      `/allmusic?page=1&limit=3&filterCategory=${filterCategory}&filter=${event.target.searchBar.value}`,
      { state: event.target.searchBar.value }
    );
  };

  return (
    <div>
      <div id="navbarTop">
        <Link to="/">
          <img
            src="https://cdn.pixabay.com/photo/2021/01/28/22/10/vinyl-record-5959161_1280.jpg"
            className="brand"
          />
        </Link>
        <form id="searchBar" onSubmit={handleSearch}>
          <span>
            <select id="filterButton" onChange={handleFilter}>
              <option value="all"> All: </option>
              <option value="artist"> Artist: </option>
              <option value="genre"> Genre: </option>
            </select>
          </span>
          <span>
            <input
              className="search_input"
              name="searchBar"
              type="text"
              placeholder="Search for artists & releases..."
            />
          </span>
          <span>
            <button type="submit"> Search </button>
          </span>
        </form>

        <div id="rightSideBtns">
          <Link to="/cart">
            <button type="button">Cart</button>
          </Link>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">
                <button type="button">My Profile</button>
              </Link>
              <Link to="/editprofile">
                <button type="button" onClick={handleClick}>
                  {" "}
                  Logout{" "}
                </button>
              </Link>
            </div>
          ) : (
            <div className="btn-ctr">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <button className="login">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="genre-ctr">
        <Link to="/allmusic"> All Music </Link>
        <Link
          to="/allmusic?page=1&limit=3&filterCategory=genre&filter=Hip Hop"
          state={{ query: "Hip Hop" }}
        >
          Hip-Hop
        </Link>
        <Link
          to="/allmusic?page=1&limit=3&filterCategory=genre&filter=Funk / Soul"
          state={{ query: "Funk / Soul" }}
        >
          Funk/Soul
        </Link>
        <Link
          to="/allmusic?page=1&limit=3&filterCategory=genre&filter=Rock"
          state={{ query: "Rock" }}
        >
          Rock
        </Link>
        <Link
          to="/allmusic?page=1&limit=3&filterCategory=genre&filter=Pop"
          state={{ query: "Pop" }}
        >
          Pop
        </Link>
        <Link
          to="/allmusic?page=1&limit=3&filterCategory=genre&filter=Electronic"
          state={{ query: "Electronic" }}
        >
          Electronic
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

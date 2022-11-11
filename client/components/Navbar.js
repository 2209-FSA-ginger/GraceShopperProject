import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
    <Link to="/">
      <img
        src="https://cdn.pixabay.com/photo/2021/01/28/22/10/vinyl-record-5959161_1280.jpg"
        className="brand"
      />
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="logContainer">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="btn-ctr">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signUp">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
    <div className="genre-ctr">
      <a>Hip-Hop</a>
      <a>Funk/Soul</a>
      <a>Rock</a>
      <a>Pop</a>
      <a>Electronic</a>
    </div>
    {/* <hr /> */}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

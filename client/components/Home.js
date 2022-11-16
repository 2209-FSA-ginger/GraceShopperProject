import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { me } from "../store";

/**
 * COMPONENT
 */
export const Home = () => {
  const {me, isLoggedIn} = useSelector((state) => state.auth);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {me.username}</h3>
        </div>
      ) : (
        <div>
          <h1> Please log back into your account </h1>{" "}
          <Link to="/login"> HERE </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

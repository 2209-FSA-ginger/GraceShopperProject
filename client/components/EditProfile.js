import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store";

export const EditProfile = () => {
  const {me, isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(me());
  // }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {me.username}</h3>
          <h2>Edit Profile</h2>
          <ul>
            <div>
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName"></input>
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName"></input>
            </div>
          </ul>
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

export default EditProfile;

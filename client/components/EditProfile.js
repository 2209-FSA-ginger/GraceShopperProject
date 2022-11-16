import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateInfo } from "../store";

export const EditProfile = () => {
  const { me } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitForm = {};
    if (event.target.username.value)
      submitForm.username = event.target.username.value;
    if (event.target.password.value)
      submitForm.password = event.target.password.value;
    if (event.target.email.value) submitForm.email = event.target.email.value;
    if (event.target.firstName.value)
      submitForm.firstName = event.target.firstName.value;
    if (event.target.lastName.value)
      submitForm.lastName = event.target.lastName.value;
    if (event.target.phone.value) submitForm.phone = event.target.phone.value;
    submitForm.userId = me.id;
    dispatch(updateInfo(submitForm));
    navigate("/home");
  };

  return (
    <div className="edit-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" />
        <label htmlFor="password">Password:</label>
        <input name="password" />
        <label htmlFor="email">Email:</label>
        <input name="email" />
        <label htmlFor="firstName">First Name:</label>
        <input name="firstName" />
        <label htmlFor="lastName">Last Name:</label>
        <input name="lastName" />
        <label htmlFor="phone">Phone:</label>
        <input name="phone" />
        <button id="edit-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

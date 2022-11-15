import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateInfo } from "../store/auth";

const EditBillingInfo = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitForm = {};
    if (event.target.addressLine1.value)
      submitForm.addressLine1 = event.target.addressLine1.value;
    if (event.target.addressLine2.value)
      submitForm.addressLine2 = event.target.addressLine2.value;
    if (event.target.city.value) submitForm.city = event.target.city.value;
    if (event.target.state.value) submitForm.state = event.target.state.value;
    if (event.target.country.value)
      submitForm.country = event.target.country.value;
    if (event.target.zipcode.value)
      submitForm.zipcode = event.target.zipcode.value;
    submitForm.userId = me.id;
    dispatch(updateInfo(submitForm));
    navigate("/home");
  };

  return (
    <div className="edit-form">
      <h2>My Billing Info</h2>

      <form onSubmit={handleSubmit}>
        <label>Address 1</label>
        <input name="addressLine1"></input>
        <label>Address 2</label>
        <input name="addressLine2"></input>
        <label>City</label>
        <input name="city"></input>
        <label>State</label>
        <input name="state"></input>
        <label>Country</label>
        <input name="country"></input>
        <label>Zipcode</label>
        <input name="zipcode"></input>
        <button id="edit-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBillingInfo;

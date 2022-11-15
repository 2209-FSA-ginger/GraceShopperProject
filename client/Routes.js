import React, { Component, Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import AllMusic from "./components/AllMusic";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import SingleAlbum from "./components/SingleAlbum";
import Cart from "./components/Cart";
import EditProfile from "./components/EditProfile";
import EditBillingInfo from "./components/EditBillingInfo"
import Checkout from "./components/Checkout"


/**
 * COMPONENT
 */
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/allmusic/:productId" element={<SingleAlbum />} />
      <Route path="/allmusic" element={<AllMusic />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/editbilling" element={<EditBillingInfo/>}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
  );
};

export default AllRoutes;

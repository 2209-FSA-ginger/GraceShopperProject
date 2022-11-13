import React, { Component, Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import AllMusic from "./components/AllMusic";
import Home from "./components/Home"
import Homepage from "./components/Homepage"

/**
 * COMPONENT
 */
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/allmusic" element={<AllMusic />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
};

export default AllRoutes;

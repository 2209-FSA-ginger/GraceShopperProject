import React, { Component, Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import AllMusic from "./components/AllMusic";

/**
 * COMPONENT
 */
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div></div>} />
      <Route path="/all" element={<AllMusic />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/home" element={<SignInPage />} />
    </Routes>
  );
};

export default AllRoutes;

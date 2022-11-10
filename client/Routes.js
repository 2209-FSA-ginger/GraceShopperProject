import React, {Component, Fragment, useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import SignInPage from './components/SignInPage';

/**
 * COMPONENT
 */
const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<h1>hello</h1>}/>
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignInPage/>}/>
        <Route path="/home" element={<SignInPage/>}/>
      </Routes>
    )
}


export default AllRoutes

import React from "react"
import { useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import AuthForm from './AuthForm';

const SignInPage = () => {
    const isLoggedIn = useSelector((state) => state.auth)
       
    return(
        <div>
        {Object.keys(isLoggedIn).length === 0  ? (
            <AuthForm/>
        ) : (
          <Navigate to="/home"/>
        )}
      </div>
    )
}

export default SignInPage
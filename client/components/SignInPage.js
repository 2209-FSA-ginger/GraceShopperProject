import React from "react"
import { useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import AuthForm from './AuthForm';

const SignInPage = () => {
    const {me, isLoggedIn} = useSelector((state) => state.auth)
       
    return(
        <div>
        {!isLoggedIn  ? (
            <AuthForm/>
        ) : (
          <Navigate to="/home"/>
        )}
      </div>
    )
}

export default SignInPage
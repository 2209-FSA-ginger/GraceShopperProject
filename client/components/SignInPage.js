import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import {Navigate} from "react-router-dom"
import AuthForm from './AuthForm';
import Home from './Home';
import {me} from '../store'

const SignInPage = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth)
    
    useEffect(() => {dispatch(me)}, [])

    return(
        <div>
        {Object.keys(isLoggedIn).length === 0  ? (
            <AuthForm method={"login"} display={"Login"}/>
        ) : (
          <Home/>
        )}
      </div>
    )
}

export default SignInPage
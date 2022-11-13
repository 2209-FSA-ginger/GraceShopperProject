import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, Navigate} from "react-router-dom"
import {me} from "../store"

/**
 * COMPONENT
 */
export const Home = () => {
  const auth = useSelector( state => state.auth)
  const dispatch = useDispatch()
  
  
  useEffect(()=> {
    dispatch(me())
  }, [])


  return (
    <div>
      {Object.keys(auth).length !== 0 ?
      <div>
        <h3>Welcome, {auth.username}</h3>
      </div> :
      <div>
      <h1> Please log back into your account </h1> <Link to="/login"> HERE </Link>
   </div>
    }
    </div>
  )
}

export default Home

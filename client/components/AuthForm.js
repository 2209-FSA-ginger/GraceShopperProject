import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = () => {

const dispatch = useDispatch()


const [getForm, setForm] = useState({
                              name: "login",
                              display: "Login"
                            })

const signUp = () => {
  setForm({name: "signup",
            display: 'Create Account'})
}

const handleSubmit = evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={getForm.name}>
        {getForm.name === "signup" ?
        <>
          <div>
            <label htmlFor="firstName">
              <small>First Name:</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name:</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input name="email" type="text" />
          </div>
        </> :
        <></>
      }
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{getForm.display}</button>
        </div>
        { getForm.name === "login" ?
          <div>
            <button type="button" onClick={signUp}> CREATE A NEW ACCOUNT </button>
          </div> :
          <></>
        }
        {/* {auth && auth.response && <div> {auth.response.data} </div>} */}
      </form>
    </div>
  )
}

export default AuthForm

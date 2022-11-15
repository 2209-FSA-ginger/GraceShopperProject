import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import {authenticate} from '../store/auth'

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
    const submitForm = {
      firstName: evt.target.firstName.value ? evt.target.firstName.value : "" ,
      lastName: evt.target.lastName.value ? evt.target.lastName.value : "",
      username: evt.target.username.value,
      password: evt.target.password.value,
      email: evt.target.email ? evt.target.email.value : "",
      method: getForm.name
    }
    dispatch(authenticate(submitForm))
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

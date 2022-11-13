import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(logout())
    navigate("/")
  }

  return(
    <div id="navbarBackground">
        <nav>
          <div id="mainNav">
            <span>
              <h3 id="storeName">FSA Music Store</h3>
            </span>
            <span>
              <select> 
                <option>Filter</option>
              </select>
              <input/>
              <button type="button"> Search </button>
            </span>
              {Object.keys(isLoggedIn).length !== 0 ? (
                <span>
                  <span className="profileNav">
                    {/* The navbar will show these links after you log in */}
                    <Link to="/home">MyProfile</Link>
                  </span>
                  <span className="profileNav">
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </span>
                </span>
              ) : (
                <span>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Sign In</Link>
                </span>
              )}
          </div>
          <div id="navMinitags">
            <Link to="/allmusic"> All Music </Link>
            <span>genre1</span>
            <span>genre2</span>
            <span>genre3</span>
            <span>genre4</span>
            <span>genre5</span>
          </div>
        </nav>
      </div>
  )
}

export default Navbar

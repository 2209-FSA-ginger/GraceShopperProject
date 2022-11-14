import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate, useLocation, createSearchParams, Link } from "react-router-dom"
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";


const AllMusic = () => {
  const allAlbums = useSelector(state => state.products)
  const [pagePlaceholder, setPagePlaceHolder] = useState(1)
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [searchParams] = useSearchParams() //can only hooks in body of a function, not inside another hook!!! 
  const searchObject = Object.fromEntries([...searchParams])

  useEffect(() => {
        dispatch(fetchProducts(searchObject))
  }, [pagePlaceholder, location.state]);

  const changeThePage = (event) => {
      if(event.target.value === ">"){
        searchObject.page = Number(searchObject.page) + 1
      } else {
        searchObject.page = Number(searchObject.page) - 1
      }
      navigate({
        pathname: "/allMusic",
        search: `?${createSearchParams(searchObject)}`
      })
      setPagePlaceHolder( prevState => prevState += 1 )
    }

  return (
    <div>
      <div className="musicList">
      {allAlbums.length !== 0 ?
      allAlbums.map((album) => {
        return (
          <ul className="album" key={album.id}>
            <Link to={`/album/${album.id}`}>
            <img id="album-img" src={album.imageURL} />
            <div className="album-text">
              <h3 id="album-title">{album.title}</h3>
              <p id="album-artist">{album.artist}</p>
            </div>
            </Link>
          </ul>
        );
      }):
      <h2>No results found. Try another search!</h2>
      }
    </div>
    <div>
     <span>
       <button type="button" value="<" onClick={changeThePage}> {"<"} </button>
     </span>
     <span>
       <button type="button"> {searchObject.page} </button>
     </span>
     <span>
       <button type="button" value=">" onClick={changeThePage}> {">"} </button>
     </span>
   </div>
  </div>
    
  );
};

export default AllMusic;

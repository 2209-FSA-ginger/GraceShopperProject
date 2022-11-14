import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import {fetchProducts} from "../store/products"


const Homepage = () => {

const dispatch = useDispatch()
const topAlbums= useSelector( state => state.products)

useEffect(() => {
    dispatch(fetchProducts({
        limit: 3, 
        order: "rating",
        scale: "DESC"
    }))
}, [])

return(
   <div id="homepageBackground">
        <div id="homepageBanner"></div>
        <div id="panelTitle">
            <h3>Most Popular Albums</h3>
        </div>
            {topAlbums ? 
            <div id="homepagePanels">
               {topAlbums.map( (album, index) => (
                <div className="homepagePanel" key={index}>
                    <Link to={`/album/${album.id}`}>
                        <img className="topAlbum" src={album.imageURL}/>
                        <div>
                            Title: {album.title}
                        </div>
                        <div>
                            Artist: {album.artist}
                        </div>
                        <div>
                            Genre: {album.genre}
                        </div>
                    </Link>
                </div>))}
            </div> :
               <h1> Loading Albums... </h1>
               }
        <div>
            <button type='button'> Subscribe </button>
        </div>
   </div>
)
}


export default Homepage
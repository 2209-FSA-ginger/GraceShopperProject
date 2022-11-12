import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {fetchProducts} from "../store/products"


const Homepage = () => {

const dispatch = useDispatch()
const topAlbums= useSelector( state => state.products)

useEffect(() => {
    dispatch(fetchProducts({
        limit: 3, 
        offset: null,
        filterCategory: null,
        filter: null,
        order: "rating",
        scale: "DESC"
    }))
}, [])

console.log(topAlbums)
return(
   <div id="homepageBackground">
        <div id="homepageBanner"></div>
        <div id="panelTitle">
            <h3>Most Popular Albums</h3>
        </div>
            {topAlbums ? 
            <div id="homepagePanels">
               {topAlbums.map( album => (
                <span className="homepagePanel">
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
                </span>))}
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
import React, { useState } from 'react'
import { connect } from 'react-redux'
// import { Form } from 'semantic-ui-react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const REACT_APP_NEIGHBORLY_TOKEN="pk.eyJ1IjoiamFpbWlldG4iLCJhIjoiY2p6dmliN2NqMDB0dzNubXJ5M3NsdTZieCJ9.KOQr6GZBT81gTk57JEZCuA"

function Map(props) {

    const [viewport, setViewport] = useState({
        latitude: 40.737099,
        longitude: -73.942656,
        width: "100vw",
        height: "610px",
        zoom: 11
    })
    const[selectedPost, setSelectedPost] = useState(null)

    // console.log("map props getallposts", props.getAllPosts)
    return(
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={REACT_APP_NEIGHBORLY_TOKEN}
                mapStyle="mapbox://styles/mapbox/navigation-guidance-day-v4"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
                onClick={e => {props.addLongLat(e.lngLat)}}>
                {props.allPosts.map(post => (
                    <Marker
                        key={post.id}
                        latitude={Number(post.latitude)}
                        longitude={Number(post.longitude)}>
                            <button
                            className="marker-btn"
                            onClick={e => {
                                e.preventDefault()
                                setSelectedPost(post)
                            }}>
                                <span role="img" aria-label="pencil"> 📍 </span>
                            </button>
                    </Marker>
                ))}
                {selectedPost ? (
                    <Popup
                    latitude={Number(selectedPost.latitude)}
                    longitude={Number(selectedPost.longitude)}
                    onClose={() => {
                        setSelectedPost(null)
                    }}>
                        <div className="popup-card">
                            <h2>{selectedPost.title}</h2>
                            <p>Category: {selectedPost.category}</p>
                            <p>Neighborhood: {selectedPost.neighborhood}</p>
                            <p>Posted by: {selectedPost.username} </p>
                            <p>Posted: {selectedPost.posted}</p>
                            <p>Expires: {selectedPost.expires}</p>
                            <br></br>
                            <p>{selectedPost.content}</p>
                            <br></br>
                            {selectedPost.image ? (
                                <img
                                    className="popup-card-img"
                                    src={selectedPost.image} alt="📷"/>
                            ) : null}
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}

function mdp(dispatch) {
  return {
    addLongLat: (longLat) => dispatch({type: "GET_LONG_LAT", payload: longLat})
  }
}

function msp(state) {
  return {
    allPosts: state.allPosts
  }
}

export default connect(msp, mdp)(Map)

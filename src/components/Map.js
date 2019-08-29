import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const REACT_APP_NEIGHBORLY_TOKEN="pk.eyJ1IjoiamFpbWlldG4iLCJhIjoiY2p6dmliN2NqMDB0dzNubXJ5M3NsdTZieCJ9.KOQr6GZBT81gTk57JEZCuA"

export default function Map(props) {

    const [viewport, setViewport] = useState({
        latitude: 40.7052569,
        longitude: -74.0162643,
        width: "100vw",
        height: "100vh",
        zoom: 11
    })
    const[selectedPost, setSelectedPost] = useState(null)
    const allPosts = props.allPosts
    // console.log(allPosts)

//props: <Map allPosts={this.state.allPosts}/>
    return(
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={REACT_APP_NEIGHBORLY_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}>
                {allPosts.map(post => (
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
                                <img src="/hug.png" alt="🤗"/>
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
                            <p>Posted by: username </p>
                            <p>Posted: {selectedPost.posted}</p>
                            <p>Expires: {selectedPost.expires}</p>
                            <br></br>
                            <p>{selectedPost.content}</p>
                            <br></br>
                            <img className="popup-card-img" src={selectedPost.image} alt="📷"/>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}

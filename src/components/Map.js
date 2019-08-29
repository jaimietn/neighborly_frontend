import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';
const REACT_APP_NEIGHBORLY_TOKEN="pk.eyJ1IjoiamFpbWlldG4iLCJhIjoiY2p6dmliN2NqMDB0dzNubXJ5M3NsdTZieCJ9.KOQr6GZBT81gTk57JEZCuA"

export default function Map(props) {

    const [viewport, setViewport] = useState({
        latitude: 40.7052569,
        longitude: -74.0162643,
        width: "100vw",
        height: 400,
        zoom: 11
    })

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
                }}
            >
                {allPosts.map(post => (
                    <Marker key={post.id} latitude={Number(post.latitude)} longitude={Number(post.longitude)}>
                        <button class="marker-btn">
                            🤗
                        </button>
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    )
}

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getSinglePost } from '../actions.js'

const REACT_APP_NEIGHBORLY_TOKEN="pk.eyJ1IjoiamFpbWlldG4iLCJhIjoiY2p6dmliN2NqMDB0dzNubXJ5M3NsdTZieCJ9.KOQr6GZBT81gTk57JEZCuA"

function Map(props) {

    let allPostsCopy = props.allPosts

    function filterPosts() {
      if (!props.selectedCategory.category) {
        return allPostsCopy
      } else if (props.selectedCategory.category === "Show All"){
        return allPostsCopy
      } else {
        return allPostsCopy.filter(post => post.category === props.selectedCategory.category)
      }
    }

    let filteredPostsCopy = filterPosts()

    // console.log(allPostsCopy)

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
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
                onClick={e => {props.addLongLat(e.lngLat)}}>
                {filteredPostsCopy.map(post => (
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
                            {(() => {
                              if (post.category === "Animal Sightings") {
                                return (
                                  <span role="img" aria-label="Love Cat"> 😻 </span>
                                )
                              } else if (post.category === "For Sale"){
                                return (
                                  <span role="img" aria-label="Dollar Sign"> 💲 </span> )

                              } else if (post.category === "Free Stuff"){
                                return (
                                  <span role="img" aria-label="Free Sign"> 🆓 </span> )

                              } else if (post.category === "Funny"){
                                return (
                                  <span role="img" aria-label="Laughing Face"> 😂 </span> )

                              } else if (post.category === "General"){
                                return (
                                  <span role="img" aria-label="Speech Balloon"> 💬 </span> )

                              } else if (post.category === "Gigs"){
                                return (
                                  <span role="img" aria-label="Money Bag"> 💰 </span> )

                              } else if (post.category === "Lost or Found Items"){
                                return (
                                  <span role="img" aria-label="Waving Hand"> 👋 </span> )

                              } else if (post.category === "Lost or Found Pets"){
                                return (
                                  <span role="img" aria-label="Crying Cat"> 😿 </span> )

                              } else if (post.category === "Missed Connections"){
                                return (
                                  <span role="img" aria-label="Exclamation Heart"> ❣️ </span> )

                              } else if (post.category === "Need Help"){
                                return (
                                  <span role="img" aria-label="SOS Sign"> 🆘 </span> )

                              } else if (post.category === "Neighborhood Events"){
                                return (
                                  <span role="img" aria-label="Balloon"> 🎈 </span> )

                              } else if (post.category === "Other"){
                                return (
                                  <span role="img" aria-label="Red Pushpin"> 📍 </span> )

                              } else if (post.category === "Protest Events"){
                                return (
                                  <span role="img" aria-label="Raised Fist"> ✊ </span> )

                              } else if (post.category === "Spotted"){
                                return (
                                  <span role="img" aria-label="Looking Eyes"> 👀 </span> )

                              } else if (post.category === "Thank You Notes"){
                                return (
                                  <span role="img" aria-label="Love Letter"> 💌 </span> )

                              } else {
                                return (
                                  <span role="img" aria-label="red pin"> 📍 </span> )}
                            })()}
                                {/*<span role="img" aria-label="pencil"> 📍 </span>*/}
                            </button>
                    </Marker>
                ))}
                {selectedPost ? (
                    <Popup
                    latitude={Number(selectedPost.latitude)}
                    longitude={Number(selectedPost.longitude)}
                    onClose={(event) => {
                        console.log("on close", event)
                        setSelectedPost(null)
                    }}>
                      <div>
                        <div className="popup-card">
                          {selectedPost.image ? (
                              <img
                                  className="popup-card-img"
                                  src={selectedPost.image} alt="📷"/>
                          ) : null }
                          <h3><strong>{selectedPost.title}</strong></h3>
                          <p><strong>Category: </strong> {selectedPost.category}</p>
                          <p><strong>{selectedPost.username}</strong> posted on <strong>{selectedPost.posted}</strong></p>
                          {/*<p><strong>Expires: </strong> {selectedPost.expires}</p>*/}
                          {selectedPost.neighborhood !== null ? (
                            <p><strong>Neighborhood:
                            </strong> {selectedPost.neighborhood}</p>
                          ) : null }
                          <p>{selectedPost.content}</p>
                        </div>
                      </div>
                      <button onClick={(event) => {
                              console.log("EVENT", event.target.id)
                          props.getSinglePost(event.target.id)
                          props.history.push('/messages')
                      }} id={selectedPost.id}> Reply to Post </button>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}

function mdp(dispatch) {
  return {
    addLongLat: (longLat) => dispatch({
        type: "GET_LONG_LAT",
        payload: longLat}),
    getSinglePost: (selectedPostId) => {
        getSinglePost(dispatch, selectedPostId)}
    // payload: selectedPostId}),
    // getSinglePost: (selectedPostId) => dispatch({type: "GET_SINGLE_POST",
    // payload: selectedPost})
  }
}

function msp(state) {
  return {
    allPosts: state.allPosts,
    selectedCategory: state.selectedCategory,
    selectedPostId: state.selectedPostId,
    selectedPost: state.selectedPost
  }
}

export default withRouter(connect(msp, mdp)(Map))

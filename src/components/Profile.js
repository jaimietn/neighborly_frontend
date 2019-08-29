import React, { Component } from 'react';
// import { Route, withRouter } from 'react-router-dom';

class Profile extends Component {

  render() {
    console.log("homepage props", this.props)
    return (
      <div className="city-background">
        <h1> This is the user profile page </h1>
        <h2> Hey, {this.props.username}! Here are all of your current posts. </h2>
      </div>
    )
  }

}

export default Profile

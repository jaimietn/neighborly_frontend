import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

class Homepage extends Component {

  render() {
    console.log("homepage props", this.props)
    return (
      <div>
        <h1> This is the homepage </h1>
        <h2> hi, {this.props.username} </h2>
      </div>
    )
  }

}

export default withRouter(Homepage)

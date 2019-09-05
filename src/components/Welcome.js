import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

class Welcome extends Component {


    render() {
      return (
        <div>
          <div>
            <h1 className="welcome-title">
              Welcome to Neighborly
            </h1>
            <h2 className="subtitle-text">
              Leave a note, anywhere in the world.
            </h2>
            <div>
                <LoginForm
                login={this.props.login}/>
                <SignUpForm
                createUser={this.props.createUser}/>
            </div>
          </div>
          <div>
          </div>
          <div className="city-background-login"></div>
        </div>
      )
    }
}
export default withRouter(Welcome)

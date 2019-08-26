import React, { Component, Fragment } from 'react';
import './App.css';

const BASE_URL = "http://localhost:3000"
const USERS_URL = "http://localhost:3000/api/v1/users"

class App extends Component {
  state = {
    user: {
      username: '',
      password: ''
    }
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = event => {
    // console.log(this.state)
    this.setState({ password: event.target.value })
  }

  createUser = (user, e) => {
    e.preventDefault()
    console.log(user)
    fetch(`${USERS_URL}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify({
          user: {
            username: user.username,
            password: user.password
          }
        })
      })
      .then(resp => resp.json())
      .then(newUser => console.log(newUser))
  }

  render() {
    return (
      <div className="App" >
        <h1>Welcome to Neighborly</h1>
        <form onSubmit={(e) => this.createUser(this.state, e)}>
          <label>
            Username:
            <textarea value={this.state.value} onChange={this.handleChangeUsername} />
          </label>
          <label>
            Password:
            <textarea value={this.state.value} onChange={this.handleChangePassword} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default App;

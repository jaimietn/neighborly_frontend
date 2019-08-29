import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import Header from './components/Header'
import AboutUs from './components/AboutUs'

const BASE_URL = "http://localhost:3000/api/v1"
const USERS_URL = "http://localhost:3000/api/v1/users"
// const POSTS_URL = "http://localhost:3000/api/v1/posts"

class App extends Component {
  state = {
    user: {}
  }

//SignUp create new user
  createUser = (user) => {
    // e.preventDefault()
    console.log(user)
    fetch(`${USERS_URL}`,
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
      .then(newUser => {
        console.log(newUser)
        if (!newUser.err) {
          console.log('NewUser Data', newUser)
          localStorage.setItem('neighborly-user-token', newUser.token)
          this.setState({ user: newUser.user})
          this.props.history.push('/neighborly')
        }
        else {
          console.log('dfbwdfb')
          alert("Username already taken!")
        }
      })
    }

    login = (user) => {
      console.log(user)
      fetch(`${BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, body: JSON.stringify({
            username: user.username,
            password: user.password
          })
        })
        .then(resp => resp.json())
        .then(data => {
          if (!data.err) {
            console.log('Login response Data', data);
            localStorage.setItem('neighborly-user-token', data.token);
            console.log(data)
            this.setState({ user: data.user });
            this.props.history.push('/neighborly');
          } else {
            console.log('dfbwdfb')
            alert("Invalid username or password")
          }
        })
    }

    componentDidMount() {
      let token = localStorage.getItem('neighborly-user-token');
      if (token) {
        fetch(`${BASE_URL}/retrieve_user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: `${token}`
          }
        })
          .then(resp => resp.json())
          .then(user => {
            // console.log(user)
            this.setState({ user: user });
            if (
              this.props.history.location.pathname === "/"
            ) {
            this.props.history.push('/neighborly');}
            else {this.props.history.push(this.props.location.pathname)}
            // console.log("new user login", this.state.user)
          });
      } else {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <div className="App" >
          <Route
            exact path="/"
            render={() => (
              <Welcome
                login={this.login}
                createUser={this.createUser} />
            )}
          />
          <Route
            exact path="/neighborly"
            render={() => (
              <>
                <Header />
                <Homepage
                  userId={this.state.user.id}
                  username={this.state.user.username}/>
              </>
            )}
          />
          <Route
            exact path="/profile"
            render={() => (
              <>
                <Header />
                <Profile
                  userId={this.state.user.id}
                  username={this.state.user.username}/>
              </>
            )}
            />
            <Route
            exact path="/aboutus"
            render={() => (
              <>
                <Header />
                <AboutUs />
              </>
            )}
          />
        </div>
      );
    }
  }

  export default withRouter(App);

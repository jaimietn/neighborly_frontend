import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome'
import Homepage from './components/Homepage'
import Header from './components/Header'
import Navbar from './components/Navbar'
import AboutUs from './components/AboutUs'

const BASE_URL = "http://localhost:3000/api/v1"
const USERS_URL = "http://localhost:3000/api/v1/users"

class App extends Component {
  state = {
    user: {}
  }

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
        if (newUser.status === 422) {
          alert('Username already taken!')
        }
        else {
          console.log('NewUser Data', newUser)
          localStorage.setItem('neighborly-user-token', newUser.token)
          this.setState({ user: newUser})
          this.props.history.push('/')
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
            this.setState({ user: data.user });
            this.props.history.push('/neighborly');
          } else {
            console.log('dfbwdfb')
            alert("Invalid username or password")
          }
        })
    }

    componentDidMount() {
      // let token = localStorage.getItem('neighborly-user-token');
      // if (token) {
      //   fetch(`${USERS_URL}/retrieve_user`, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Accepts: 'application/json',
      //       Authorization: `${token}`
      //     }
      //   })
      //     .then(resp => resp.json())
      //     .then(user => {
      //       this.setState({ user: user });
      //       this.props.history.push('/neighborly');
      //     });
      // } else {
      //   this.props.history.push('/')
      // }
    }

    render() {
      return (
        <div className="App" >
          <Route
            exact path="/"
            render={() => (
              <Welcome login={this.login} createUser={this.createUser} />
            )}
          />
          <Route
            exact path="/neighborly"
            render={() => (
              <>
                <Header />
                <Homepage userId={this.state.user.id} username={this.state.user.username}/>
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

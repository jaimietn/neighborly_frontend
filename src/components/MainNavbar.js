import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class MainNavbar extends React.Component {

  logout = () => {
    localStorage.removeItem('neighborly-user-token')
    this.props.history.push("/")
  }

  render() {
    return (
      <Navbar className="navbar-styling sticky">
        <Navbar.Brand href="/neighborly" className="nav-logo">Neighborly</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/profile" className="nav-link">Profile</Nav.Link>
          <Nav.Link href="/messages" className="nav-link">Messages</Nav.Link>
          <Nav.Link href="/aboutus" className="nav-link">About Us</Nav.Link>
        </Nav>
          <Form inline>
            <Button onClick={this.logout} className="nav-logout"> Logout </Button>
          </Form>
      </Navbar>
    )
  }
}
export default withRouter(MainNavbar)

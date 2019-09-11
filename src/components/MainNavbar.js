import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class MainNavbar extends React.Component {

  logout = () => {
    localStorage.removeItem('neighborly-user-token')
    this.props.history.push("/")
  }

  render() {
    return (
      <Navbar expand="lg" className="navBar-styling">
        <Navbar.Brand href="/neighborly" className="navLogo">Neighborly</Navbar.Brand>
        <Nav className="nav-links">
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/messages">Messages</Nav.Link>
          <Nav.Link onClick={this.logout} name="logout" className="nav-logout">Log Out</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
export default withRouter(MainNavbar)

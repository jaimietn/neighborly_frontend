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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/neighborly" className="navLogo">Neighborly</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link onClick={this.logout} name="logout" className="nav-item">Log Out</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
export default withRouter(MainNavbar)

// import React from 'react'
// import { Menu } from 'semantic-ui-react';
// import { withRouter } from 'react-router-dom';
//
// class MainNavbar extends React.Component {
//
//   logout = () => {
//     localStorage.removeItem('neighborly-user-token')
//     this.props.history.push("/")
//   }
//
//   render() {
//     return (
//     <div className="sticky">
//       <Menu fluid widths={3}>
//         <Menu.Item
//         onClick={_ => this.props.history.push("/profile")} as="a" name="profile" className="nav-item">
//           Profile
//         </Menu.Item>
//
//         <Menu.Item
//         onClick={_ => this.props.history.push("/aboutus")} as="a" name="about-us" className="nav-item">
//           About Us
//         </Menu.Item>
//
//         <Menu.Item
//         as="a" onClick={this.logout} name="logout" className="nav-item">
//           Logout
//         </Menu.Item>
//       </Menu>
//     </div>
//     )
//   }
// }
// export default withRouter(MainNavbar)
//
//

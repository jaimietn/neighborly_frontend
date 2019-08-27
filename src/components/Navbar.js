import React from 'react'
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

  logout = () => {
    localStorage.removeItem('neighborly-user-token')
    this.props.history.push("/")
  }

  render() {
    return (
      <Menu fluid widths={3}>
        <Menu.Item
        onClick={_ => this.props.history.push("/neighborly")} as="a" name="profile" className="nav-item">
          Profile
        </Menu.Item>

        <Menu.Item
        onClick={_ => this.props.history.push("/aboutus")} as="a" name="about-us" className="nav-item">
          About Us
        </Menu.Item>

        <Menu.Item
        as="a" onClick={this.logout} name="logout" className="nav-item">
          Logout
        </Menu.Item>

      </Menu>

    )
  }
}
export default withRouter(Navbar)

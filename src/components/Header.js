import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import '../assets/header.css';


class Header extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="titleFont">showMe</Navbar.Brand>
          <Link className="discover" to="/">Discover</Link>
          <Link to="/profile" className="watchList">watchList</Link>
          <div className='ml-auto'>
            { !this.props.auth0.isAuthenticated && <LoginButton className="loginButton"/> }
            { this.props.auth0.isAuthenticated && <LogoutButton /> }
          </div>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
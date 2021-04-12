import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import '../assets/header.css';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <Button className="loginButton" onClick={loginWithRedirect}>Log in</Button>
  );
}


export default LoginButton;
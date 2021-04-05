import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';
import '../assets/login.css';

class Login extends React.Component {
  render() {
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          <LoginButton />
          {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
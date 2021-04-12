import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';
// import '../assets/login.css';

class Login extends React.Component {
  render() {
    return(
      <Card className="mx-auto bg-dark text-light" id="login" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click the button to login
          </Card.Text>
          <LoginButton />
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
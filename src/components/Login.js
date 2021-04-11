import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';
// import '../assets/login.css';

class Login extends React.Component {
  render() {
    return(
      <Card className="mx-auto mt-5" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Demo Credentials:
            <br></br>
            Email address: demo@demo.com
            <br></br>
            Password: Demo1234!
          </Card.Text>
          <LoginButton />
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
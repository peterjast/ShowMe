import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import '../assets/App.css';
import Container from 'react-bootstrap/Container';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return(
        <Router>
          <IsLoadingAndError>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/">
                  { this.props.auth0.isAuthenticated ? <Dashboard /> : <Login/> }
                </Route>
                <Route exact path="/profile">
                  { this.props.auth0.isAuthenticated ? <Profile properties={this.props}/> : <Login /> }
                </Route>
              </Switch>
            </Container>
            <Footer />
          </IsLoadingAndError>
        </Router>
    )
  }
  
}

export default withAuth0(App);
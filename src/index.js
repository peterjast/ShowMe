import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain="dev-1qak061b.us.auth0.com"
        clientId="mOnOHpN4xCqdvk2cwNdx13VRY7ceXQ4W"
        redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
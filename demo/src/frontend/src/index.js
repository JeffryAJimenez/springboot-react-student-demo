import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainLayout from './components/mainLayout';

import {Auth0Provider} from '@auth0/auth0-react';
ReactDOM.render(
  <Auth0Provider
    domain="dev-o6l7dusq.us.auth0.com"
    clientId="2VjUjv9BOLwvswVrg6MuahJRH0Qx9ebA"
    audience="http://springboot-react-student-demo-api.com"
    redirectUri={window.location.origin}
  >
    <MainLayout />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

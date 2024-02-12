import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';

import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackbarProvider } from 'notistack';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <GoogleOAuthProvider
    clientId= {process.env.REACT_APP_AUTH_ID}
    >
      <Provider store = {store}>

        <SnackbarProvider>
          <App />
        </SnackbarProvider>

      </Provider>

    </GoogleOAuthProvider>

);

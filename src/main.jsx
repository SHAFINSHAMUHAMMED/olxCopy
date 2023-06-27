import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'
import { firebase,auth,storage } from './firebase/config';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ auth,storage }}>
      <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

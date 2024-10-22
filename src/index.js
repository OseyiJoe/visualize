import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App/App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="visualize">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // Pass the root element here as the second argument
);

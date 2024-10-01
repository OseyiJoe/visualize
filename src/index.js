import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { UserProvider } from './components/CustomProviderComponent/CustomProviderComponent';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="canine-cove">
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

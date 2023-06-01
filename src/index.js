import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { store } from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

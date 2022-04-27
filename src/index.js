import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'; //npm add sass
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './contexts/user.context';
import { CategoriesContextProvider } from './contexts/categories.context';
import { CartContextProvider } from './contexts/cart.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
      <UserContextProvider>
        <CategoriesContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoriesContextProvider>
      </UserContextProvider>
  </Router>
  </React.StrictMode>
);


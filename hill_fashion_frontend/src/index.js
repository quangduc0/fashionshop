import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ShopContextProvider from './context/ShopContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
        <App/>
    </ShopContextProvider>
);

reportWebVitals();

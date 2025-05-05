import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/index.css'; // or './index.css' if it’s in the root

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

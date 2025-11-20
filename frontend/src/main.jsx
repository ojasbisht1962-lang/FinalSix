import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import LampBackground from './components/3d/LampBackground';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LampBackground />
    <App />
  </React.StrictMode>
);


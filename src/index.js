import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// excluir localstorage

localStorage.setItem("login", JSON.stringify({cpf: "122.830.627-30", senha: "1234"}))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

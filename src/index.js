import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// excluir localstorage

// RH - {auth: "ODE0Ljk2Mi45MzYtMDY6MTIzNA=="  , cpf: "814.962.936-06" }
// CEO - {auth: "MDAxLjIzNi45NTAtMDc6MTIzNA==", cpf: "001.236.950-07" }
// GESTOR - {auth: "MTA5LjAzMC42NDctNDA6MTIzNA==" , cpf: "109.030.647-40" }

localStorage.setItem("user", JSON.stringify({auth: "MDAxLjIzNi45NTAtMDc6MTIzNA==", cpf: "001.236.950-07" }))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

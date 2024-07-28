import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// excluir localstorage

// CEO - {auth: "MDAxLjIzNi45NTAtMDc6MTIzNA==", cpf: "001.236.950-07" }
// funcionario - { auth: "OTA1Ljg5MC41NjYtNzA6MTIzNA==", cpf: "905.890.566-70" }
// Gestor - {auth: "MDE2LjY0NC4xNTYtMjk6MTIzNA==", cpf: "016.644.156-29" }


localStorage.setItem("user", JSON.stringify({auth: "MDAxLjIzNi45NTAtMDc6MTIzNA==", cpf: "001.236.950-07" }))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

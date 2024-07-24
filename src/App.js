import { useEffect, useState } from 'react';
import Header from './components/Header';
import './styles/App.css';
import Teste from './teste.json';

function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    async function fetchDate() {
      const usuario = JSON.parse(localStorage.getItem("login"));
      localStorage.clear()
      
      if (usuario) {
        const db = Teste
        setUsuario(db)
      }
    }

    fetchDate()
  }, [])


  return (
    <>
    {
      usuario && (
        <>
          <Header nome={usuario.nome} />
        </>
      )
    }
    </>
  );
}

export default App;

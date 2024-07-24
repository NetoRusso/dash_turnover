import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./styles/App.css";
import Teste from "./json/login.json";
import Buscador from "./components/Buscardor";
import Tabela from "./components/Tabela";
import Cargo from "./json/cargo.json";
import Departamentos from "./json/departamentos.json";
import Funcionarios from "./json/funcionarios.json";

const tabelasGerais = [
  {
    nome: "Funcionario",
    titulos: [
      "Nome Completo",
      "E-mail",
      "Data de contratação",
      "Departamento",
      "Cargo",
      "Salario",
    ],
    colospan: ["3", "3", "2", "2", "2", "2"],
  },
  {
    nome: "Departamento",
    titulos: ["Nome", "Localização", "Descrição"],
    colospan: ["2", "5", "7"],
  },
  {
    nome: "Cargo",
    titulos: ["Nome", "Descrição", "Carga horaria", "Salario"],
    colospan: ["3", "5", "1", "2"],
  },
];

function App() {
  const [usuario, setUsuario] = useState(null);
  const [indexTabela, setIndexTabela] = useState(0);
  const [dadosTabela, setDadosTabela] = useState([]);

  useEffect(() => {
    async function fetchDate() {
      const usuario = JSON.parse(localStorage.getItem("login"));
      localStorage.clear();

      if (usuario) {
        const db = Teste;
        setUsuario(db);
      }
    }

    fetchDate();
  }, []);

  useEffect(() => {
    funcionarioBancoDeDados();
  }, []);

  const departamentoBancoDeDados = () => {
    setDadosTabela(Departamentos);
  };

  const cargoBancoDeDados = () => {
    setDadosTabela(Cargo);
  };

  const funcionarioBancoDeDados = () => {
    setDadosTabela(Funcionarios);
  };

  return (
    <>
      {usuario && (
        <>
          <Header nome={usuario.nome} />
          <main className="principal">
            <section
              className="tableDash"
              id="table_dash"
              aria-label="Tabelas gerenciais"
            >
              {usuario.usuario.tipoDeAcessoEnum !== "FUNCIONARIO" && (
                <>
                  <Buscador
                    nomeTabela={tabelasGerais[indexTabela].nome}
                    tipoAcesso={usuario.usuario.tipoDeAcessoEnum}
                  />
                  <Tabela
                    tabelaTitulos={tabelasGerais[indexTabela]}
                    tabelaDados={dadosTabela}
                    tipoAcesso={usuario.usuario.tipoDeAcessoEnum}
                  />
                  <div className="btnSwitchTable">
                    <button
                      className="btnSwitchTableBtn btnStand"
                      id="btn_switch_table_funcionarios"
                      onClick={() => {if (indexTabela !== 0) { setIndexTabela(0);  funcionarioBancoDeDados()}}}
                    >
                      Tabela Funcionários
                    </button>
                    {usuario.usuario.tipoDeAcessoEnum !== "GESTOR" && (
                      <button
                        className="btnSwitchTableBtn btnStand"
                        id="btn_switch_table_departamentos"
                        onClick={() => {if (indexTabela !== 1) { setIndexTabela(1);  departamentoBancoDeDados()}}}
                      >
                        Tabela Departamentos
                      </button>
                    )}
                    <button
                      className="btnSwitchTableBtn btnStand"
                      id="btn_switch_table_cargos"
                      onClick={() => {if (indexTabela !== 2) { setIndexTabela(2);  cargoBancoDeDados()}}}
                    >
                      Tabela Cargos
                    </button>
                  </div>
                </>
              )}
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default App;

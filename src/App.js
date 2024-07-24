import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./styles/dash.css";
import Teste from "./json/login.json";
import Buscador from "./components/Buscardor";
import Tabela from "./components/Tabela";
import {
  cargoBancoDeDados,
  departamentoBancoDeDados,
  funcionarioBancoDeDados,
} from "./db";
import Formulario from "./components/Formulario";
import TabelaDeVisualizar from "./components/TabelaDeVIsuailizar";

const tabelasGerais = [
  {
    nome: "Funcionario",
    titulos: [
      "Nome Completo",
      "Data de contratação",
      "Turno",
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

const acaoPagina = [
  {
    nomeAcao: "Tabela",
    tipo: "tabela",
  },
  {
    nomeAcao: "Adicionando",
    tipo: "formulario",
  },
  {
    nomeAcao: "Visualizando",
    tipo: "visual",
  },
  {
    nomeAcao: "Editando",
    tipo: "formulario",
  },
];

function App() {
  const [usuario, setUsuario] = useState(null);
  const [indexTabela, setIndexTabela] = useState(0);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [ativo, setAtivo] = useState(0);
  const [visualizar, setVisualizar] = useState(null);

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
    setDadosTabela(funcionarioBancoDeDados());
  }, []);

  const vizualizar = (dados) => {
    setVisualizar(dados)
    setAtivo(2);
  }

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
                    tipoAcao={acaoPagina[ativo]}
                    botaoNovo={() => {
                      setAtivo(1);
                    }}
                    botaoVoltar={() => {
                      setAtivo(0);
                    }}
                  />
                  {acaoPagina[ativo].tipo === "tabela" && (
                    <>
                      <Tabela
                        tabelaTitulos={tabelasGerais[indexTabela]}
                        tabelaDados={dadosTabela}
                        tipoAcesso={usuario.usuario.tipoDeAcessoEnum}
                        botaoEditar={() => {
                          setAtivo(3);
                        }}
                        botaoVisual={vizualizar}
                      />
                      <div className="btnSwitchTable">
                        <button
                          className="btnSwitchTableBtn btnStand"
                          id="btn_switch_table_funcionarios"
                          disabled={indexTabela === 0}
                          onClick={() => {
                            setIndexTabela(0);
                            setDadosTabela(funcionarioBancoDeDados());
                          }}
                        >
                          Tabela Funcionários
                        </button>
                        {usuario.usuario.tipoDeAcessoEnum !== "GESTOR" && (
                          <button
                            className="btnSwitchTableBtn btnStand"
                            id="btn_switch_table_departamentos"
                            disabled={indexTabela === 1}
                            onClick={() => {
                              setIndexTabela(1);
                              setDadosTabela(departamentoBancoDeDados());
                            }}
                          >
                            Tabela Departamentos
                          </button>
                        )}
                        <button
                          className="btnSwitchTableBtn btnStand"
                          id="btn_switch_table_cargos"
                          disabled={indexTabela === 2}
                          onClick={() => {
                            setIndexTabela(2);
                            setDadosTabela(cargoBancoDeDados());
                          }}
                        >
                          Tabela Cargos
                        </button>
                      </div>
                    </>
                  )}
                  {acaoPagina[ativo].tipo === "formulario" && (
                    <Formulario
                      nomeTabela={tabelasGerais[indexTabela].nome}
                      acao={acaoPagina[ativo].nomeAcao}
                      tipoAcesso={usuario.usuario.tipoDeAcessoEnum}
                    />
                  )}
                  {
                    acaoPagina[ativo].tipo === "visual" && (
                      <TabelaDeVisualizar nomeTabela={tabelasGerais[indexTabela].nome} visualizar={visualizar}/>
                    )
                  }
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

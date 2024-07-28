import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./styles/dash.css";
import Buscador from "./components/Buscardor";
import Tabela from "./components/Tabela";
import {
  getAllCargoBancoDeDados,
  getAllDepartamentoBancoDeDados,
  getAllFuncionarioBancoDeDados,
  loginBancoDeDados,
} from "./db";
import Formulario from "./components/Formulario";
import TabelaDeVisualizar from "./components/TabelaDeVIsuailizar";
import ModalExcluir from "./components/ModalExcluir";
import { filterTabela } from "./util";

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
  const [inicio, setInicio] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [indexTabela, setIndexTabela] = useState(0);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [ativo, setAtivo] = useState(0);
  const [visualizar, setVisualizar] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState('')

  useEffect(() => {
    async function fetchDate() {
      const local = JSON.parse(localStorage.getItem("user"));

      if (local && inicio) {
        const db = await loginBancoDeDados(local.cpf, local.auth);

        if (db && 'nome' in db) {
          setUsuario(db);
        } else {
          window.location.pathname = "../login.html";
        }

        localStorage.clear()

      } else {
        window.location.pathname = "../login.html";
      }
    }

    fetchDate();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setDadosTabela(await getAllFuncionarioBancoDeDados());
    }

    if (usuario !== null && inicio) {
      fetchData();
      setInicio(false);
    }
  }, [usuario, inicio]);

  const vizualizar = (dados) => {
    setVisualizar(dados);
    setAtivo(2);
  };

  const botaoExcluir = (dados) => {
    setVisualizar(dados);
    setIsOpen(true);
  };

  const botaoEditar = (dados) => {
    setVisualizar(dados);
    setAtivo(3);
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
                    tipoAcao={acaoPagina[ativo]}
                    botaoNovo={() => {
                      setAtivo(1);
                    }}
                    botaoVoltar={() => {
                      setAtivo(0);
                    }}
                    pesquisa={pesquisa}
                    onChange={setPesquisa}
                  />
                  {acaoPagina[ativo].tipo === "tabela" && (
                    <>
                      <ModalExcluir
                        open={modalIsOpen}
                        nomeTabela={tabelasGerais[indexTabela].nome}
                        nome={visualizar ? visualizar : ""}
                        botaoFecharModal={() => setIsOpen(false)}
                        atualizandoTabela={
                          async () => {
                            if (tabelasGerais[indexTabela].nome === "Funcionario") {
                              setDadosTabela(await getAllFuncionarioBancoDeDados());
                            } else if (tabelasGerais[indexTabela].nome === "Departamento") {
                              setDadosTabela(await getAllDepartamentoBancoDeDados());
                            } else {
                              setDadosTabela(await getAllCargoBancoDeDados());
                            }
                          }
                        }
                        id={visualizar ? visualizar.id : ''}
                      />
                      <Tabela // (tabela, palavra, tipo)
                        tabelaTitulos={tabelasGerais[indexTabela]}
                        tabelaDados={pesquisa !== '' ? filterTabela(dadosTabela, pesquisa, tabelasGerais[indexTabela].nome) : dadosTabela}
                        tipoAcesso={usuario.usuario.tipoDeAcessoEnum}
                        botaoEditar={botaoEditar}
                        botaoVisual={vizualizar}
                        botaoExcluir={botaoExcluir}
                        usuario={usuario}
                      />
                      <div className="btnSwitchTable">
                        <button
                          className="btnSwitchTableBtn btnStand"
                          id="btn_switch_table_funcionarios"
                          disabled={indexTabela === 0}
                          onClick={async () => {
                            setDadosTabela(await getAllFuncionarioBancoDeDados());
                            setIndexTabela(0);
                          }}
                        >
                          Tabela Funcionários
                        </button>
                        {usuario.usuario.tipoDeAcessoEnum !== "GESTOR" && (
                          <button
                            className="btnSwitchTableBtn btnStand"
                            id="btn_switch_table_departamentos"
                            disabled={indexTabela === 1}
                            onClick={async () => {
                              setDadosTabela(await getAllDepartamentoBancoDeDados());
                              setIndexTabela(1);
                            }}
                          >
                            Tabela Departamentos
                          </button>
                        )}
                        <button
                          className="btnSwitchTableBtn btnStand"
                          id="btn_switch_table_cargos"
                          disabled={indexTabela === 2}
                          onClick={async () => {
                            setDadosTabela(await getAllCargoBancoDeDados());
                            setIndexTabela(2);
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
                      botaoConfirmandoFuncionario={async () => {
                        setDadosTabela(await getAllFuncionarioBancoDeDados());
                        setAtivo(0);
                      }}
                      botaoConfirmandoDepartamento={async () => {
                        setDadosTabela(await getAllDepartamentoBancoDeDados());
                        setAtivo(0);
                      }}
                      botaoConfirmandoCargo={async () => {
                        setDadosTabela(await getAllCargoBancoDeDados())
                        setAtivo(0);
                      }}
                      editar={visualizar}
                    />
                  )}
                  {acaoPagina[ativo].tipo === "visual" && (
                    <TabelaDeVisualizar
                      nomeTabela={tabelasGerais[indexTabela].nome}
                      visualizar={visualizar}
                    />
                  )}
                </>
              )}
              {
                usuario.usuario.tipoDeAcessoEnum === "FUNCIONARIO" && (
                  <TabelaDeVisualizar
                    nomeTabela={'Funcionario'}
                    visualizar={usuario}
                  />
                )
              }
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default App;

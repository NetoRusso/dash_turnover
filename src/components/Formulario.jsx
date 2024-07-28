import { useEffect, useState } from "react";
import { pegaDataAtualDoContrato, mascaraCPF, removeDigitos, mascaraDinheiro, transformarMascaraDeDinheiroParaFloat, formatoFuncionarioParaAlterar } from "../util";
import ModalMensagem from "./ModalMensagem";
import { createFuncionarioBancoDeDados, createDepartamentoBancoDeDados, createCargoBancoDeDados, updateCargoBancoDeDados, updateDepartamentoBancoDeDados, getAllDepartamentoBancoDeDados, getAllCargoBancoDeDados, updateFuncionariosBancoDeDados } from "../db";

export default function Formulario({
  nomeTabela,
  acao,
  tipoAcesso,
  botaoConfirmandoFuncionario,
  botaoConfirmandoDepartamento,
  botaoConfirmandoCargo,
  editar,
}) {
  const [mensagem, setMensagem] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [allCargo, setAllCargo] = useState([]);
  const [allDepartamento, setAllDepartamento] = useState([]);

  const [novoFuncionario, setNovoFuncionario] = useState({
    contratacao: pegaDataAtualDoContrato(),
    email: '',
    modalidade: '',
    nascimento: '',
    nome: '',
    turno: '',
    usuario: {
      tipoDeAcesso: '',
      cpf: '',
      senha: '1234'
    },
    cargo: '',
    departamento: ''
  });

  const [novoDepartamento, setNovoDepartamento] = useState({
    nomeDepartamento: '',
    localizacao: '',
    descricao: '',
  });

  const [novoCargo, setNovoCargo] = useState({
    nome: '',
    descricao: '',
    cargaHoraria: '',
    salario: ''
  })

  const createFuncionario = async () => {
    const create = await createFuncionarioBancoDeDados({
      ...novoFuncionario,
      modalidade: novoFuncionario.modalidade === "" ? 'PRESENCIAL' : novoFuncionario.modalidade,
      turno: novoFuncionario.turno === "" ? "TURNO_A" : novoFuncionario.turno,
      usuario: { ...novoFuncionario.usuario, tipoDeAcesso: novoFuncionario.usuario.tipoDeAcesso === "" ? "FUNCIONARIO" : novoFuncionario.usuario.tipoDeAcesso }
    });

    if (!create.ok) {
      setMensagem(create.mensagem)
    }

    if (create.ok) {
      setIsOpen(true)
    }
  }

  const createDepartamento = async () => {
    const create = await createDepartamentoBancoDeDados({ ...novoDepartamento });

    if (!create.ok) {
      setMensagem(create.mensagem)
    }

    if (create.ok) {
      setIsOpen(true)
    }
  }

  const createCargo = async () => {
    const create = await createCargoBancoDeDados({ ...novoCargo, salario: transformarMascaraDeDinheiroParaFloat(novoCargo.salario) })

    if (!create.ok) {
      setMensagem(create.mensagem)
    }

    if (create.ok) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (editar && acao === 'Editando') {
      const { id, ...novo } = editar;
      switch (nomeTabela) {
        case 'Funcionario':
          console.log(novo)
          setNovoFuncionario(formatoFuncionarioParaAlterar(novo))
          setId(id)
          break;
        case 'Departamento':
          setNovoDepartamento({ ...novo });
          setId(id)
          break;
        case 'Cargo':
          setNovoCargo({
            ...novo, salario: mascaraDinheiro(novo.salario.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }))
          });
          setId(id)
          break;
      }
    }

  }, [editar, acao, nomeTabela])

  const updateCargo = async () => {
    if (id) {
      const update = await updateCargoBancoDeDados(id, { ...novoCargo, salario: transformarMascaraDeDinheiroParaFloat(novoCargo.salario) })

      if (!update.ok) {
        setMensagem(update.mensagem);
      }

      if (update.ok) {
        setIsOpen(true);
      }
    }
  }

  const updateDepartamento = async () => {
    if (id) {
      const update = await updateDepartamentoBancoDeDados(id, novoDepartamento)

      if (!update.ok) {
        setMensagem(update.mensagem);
      }

      if (update.ok) {
        setIsOpen(true);
      }
    }
  }

  const updateFuncionario = async () => {
    if (id) {
      const update = await updateFuncionariosBancoDeDados(id, novoFuncionario, editar)

      if (!update.ok) {
        setMensagem(update.mensagem);
      }

      if (update.ok) {
        setIsOpen(true);
      }
    }
  }

  useEffect(() => {
    if (mensagem !== '') {
      setTimeout(() => {
        setMensagem('')
      }, 10000)
    }
  }, [mensagem])

  useEffect(() => {
    async function fetchDate() {
      setAllDepartamento(await getAllDepartamentoBancoDeDados())
      setAllCargo(await getAllCargoBancoDeDados())
    }

    fetchDate()
  }, [])

  return (
    <>
      <ModalMensagem
        open={modalIsOpen}
        fecharModal={() => setIsOpen(false)}
        nome={nomeTabela}
        botaoConfirmandoFuncionario={botaoConfirmandoFuncionario}
        botaoConfirmandoDepartamento={botaoConfirmandoDepartamento}
        botaoConfirmandoCargo={botaoConfirmandoCargo}
        acao={acao}
      />
      {nomeTabela === "Funcionario" && (
        <div className="addNewBox addNewFuncionario">
          <form
            action="submit"
            className="addNew addFuncionario"
            id="addFuncionario"
            onSubmit={(e) => {
              e.preventDefault(); if (acao === "Adicionando") {
                createFuncionario()
              } else {
                updateFuncionario()
              }
            }}
          >
            <div className="blocoAddNew">
              <label htmlFor="name">Nome:</label>
              <input
                className="inputFormDash"
                type="text"
                name="nome"
                value={novoFuncionario.nome}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
                id="name"
                placeholder="Nome"
                disabled={tipoAcesso === "GESTOR"}
                required
              />
            </div>

            <div className="blocoAddNew">
              <label htmlFor="cpf">CPF:</label>
              <input
                className="inputFormDash"
                type="text"
                name="cpf"
                id="cpf"
                placeholder="CPF"
                value={novoFuncionario.usuario.cpf}
                maxLength="14"
                onChange={(e) => { setNovoFuncionario({ ...novoFuncionario, usuario: { ...novoFuncionario.usuario, [e.target.name]: mascaraCPF(e.target.value) } }); }}
                disabled={acao === "Editando"}
                required
              />
            </div>

            <div className="blocoAddNew">
              <label htmlFor="data">Data de Nascimento:</label>
              <input
                className="inputFormDash"
                type="date"
                name="nascimento"
                value={novoFuncionario.nascimento}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
                id="data"
                placeholder="Data de Nascimento"
                disabled={acao === "Editando"}
                required
              />
            </div>

            <div className="blocoAddNew">
              <label htmlFor="email">E-mail:</label>
              <input
                className="inputFormDash"
                type="email"
                name="email"
                value={novoFuncionario.email}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
                id="email"
                placeholder="E-mail"
                disabled={tipoAcesso === "GESTOR"}
              />
            </div>

            <div className="blocoAddNew">
              <label htmlFor="turno">Turno:</label>
              <select
                className="inputFormDash"
                name="turno"
                id="turno"
                disabled={acao === "Editando" && tipoAcesso === "RH"}
                value={novoFuncionario.turno}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="">Escolha um turno</option>
                <option value="TURNO_A">Matutino</option>
                <option value="TURNO_B">Vespertino</option>
                <option value="TURNO_C">Noturno</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label htmlFor="modalidade">Modalidade:</label>
              <select
                className="inputFormDash"
                name="modalidade"
                id="modalidade"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.modalidade}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="">Escolha uma modalidade</option>
                <option value="REMOTO">Remoto</option>
                <option value="HIBRIDO">Hibrido</option>
                <option value="PRESENCIAL">Presencial</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label htmlFor="tipoDeAcesso">Acesso:</label>
              <select
                className="inputFormDash"
                name="tipoDeAcesso"
                id="tipoDeAcesso"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.usuario.tipoDeAcesso}
                onChange={(e) => { setNovoFuncionario({ ...novoFuncionario, usuario: { ...novoFuncionario.usuario, [e.target.name]: e.target.value } }); }}
                required
              >
                <option value="">Escolha um acesso</option>
                <option value="GESTOR">Gestor</option>
                <option value="RH">RH</option>
                <option value="FUNCIONARIO">Funcionário</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label htmlFor="departamento">Departamento:</label>
              <select
                className="inputFormDash"
                name="departamento"
                id="departamento"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.departamento}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="">Escolha um departamento</option>
                {
                  allDepartamento.length > 0 && (
                    allDepartamento.map(({ id, nomeDepartamento }) => (
                      <option value={id}>{nomeDepartamento}</option>
                    ))
                  )
                }
              </select>
            </div>

            <div className="blocoAddNew">
              <label htmlFor="cargo">Cargo:</label>
              <select
                className="inputFormDash"
                name="cargo"
                id="cargo"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.cargo}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="">Escolha um cargo</option>
                {
                  allCargo.length > 0 && (
                    allCargo.map(({ id, nome }) => (
                      <option value={id}>{nome}</option>
                    ))
                  )
                }
              </select>
            </div>
            {acao === "Adicionando" && (
              <button type="submit" className="btnAddNew">Adicionar Funcionário</button>
            )}
            {acao === "Editando" && (
              <button type="submit" className="btnAddNew">Editando Funcionário</button>
            )}
            {
              mensagem !== "" && (
                <p>{mensagem}</p>
              )
            }
          </form>
        </div>
      )}
      {nomeTabela === "Departamento" && (
        <div class="addNewBox addNewDepartamento">
          <form
            action="submit"
            class="addNew addFuncionario"
            id="addFuncionario"
            onSubmit={(e) => {
              e.preventDefault(); if (acao === "Adicionando") {
                createDepartamento()
              } else {
                updateDepartamento()
              }
            }}
          >
            <div class="blocoAddNew">
              <label htmlFor="name">Nome Do Departamento:</label>
              <input
                class="inputFormDash"
                type="text"
                name="nomeDepartamento"
                id="name"
                placeholder="Nome Do Departamento"
                value={novoDepartamento.nomeDepartamento}
                onChange={(e) => setNovoDepartamento({ ...novoDepartamento, [e.target.name]: e.target.value })}
                required
              />
            </div>

            <div class="blocoAddNew">
              <label htmlFor="localizacao">Localização Do Departamento:</label>
              <input
                class="inputFormDash"
                type="text"
                name="localizacao"
                id="localizacao"
                value={novoDepartamento.localizacao}
                onChange={(e) => setNovoDepartamento({ ...novoDepartamento, [e.target.name]: e.target.value })}
                placeholder="Localização Do Departamento"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label htmlFor="descricao">Descrição Do Departamento:</label>
              <input
                class="inputFormDash"
                type="text"
                name="descricao"
                value={novoDepartamento.descricao}
                onChange={(e) => setNovoDepartamento({ ...novoDepartamento, [e.target.name]: e.target.value })}
                id="descricao"
                placeholder="Descrição Do Departamento"
                required
              />
            </div>

            {acao === "Adicionando" && (
              <button type="submit" class="btnAddNew">Adicionar Departamento</button>
            )}
            {acao === "Editando" && (
              <button type="submit" class="btnAddNew">Editando Departamento</button>
            )}
            {
              mensagem !== "" && (
                <p>{mensagem}</p>
              )
            }
          </form>
        </div>
      )}
      {nomeTabela === "Cargo" && (
        <div class="addNewBox addNewCargo">
          <form
            action="submit"
            class="addNew addFuncionario"
            id="addFuncionario"
            onSubmit={(e) => {
              e.preventDefault(); if (acao === "Adicionando") {
                createCargo();
              } else {
                updateCargo();
              }
            }}
          >
            <div class="blocoAddNew">
              <label htmlFor="nome">Nome Do Cargo:</label>
              <input
                class="inputFormDash"
                type="text"
                name="nome"
                id="nome"
                value={novoCargo.nome}
                onChange={(e) => setNovoCargo({ ...novoCargo, [e.target.name]: e.target.value })}
                placeholder="Nome Do Cargo"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label htmlFor="descricao">Descrição Do Cargo:</label>
              <input
                class="inputFormDash"
                type="text"
                name="descricao"
                id="descricao"
                value={novoCargo.descricao}
                onChange={(e) => setNovoCargo({ ...novoCargo, [e.target.name]: e.target.value })}
                placeholder="Descrição Do Cargo"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label htmlFor="cargaHoraria">Carga horária Semanal (em horas):</label>
              <input
                class="inputFormDash"
                type="text"
                name="cargaHoraria"
                id="cargaHoraria"
                maxLength={2}
                value={novoCargo.cargaHoraria}
                onChange={(e) => { setNovoCargo({ ...novoCargo, [e.target.name]: Number(removeDigitos(e.target.value)) }) }}
                placeholder="Carga horária Semanal"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label htmlFor="salario">Salário:</label>
              <input
                class="inputFormDash"
                type="text"
                name="salario"
                id="salario"
                value={novoCargo.salario}
                onChange={(e) => { setNovoCargo({ ...novoCargo, [e.target.name]: mascaraDinheiro(e.target.value) }) }}
                placeholder="Salário"
                required
              />
            </div>
            {acao === "Adicionando" && (
              <button type="submit" class="btnAddNew">Adicionar cargo</button>
            )}
            {acao === "Editando" && (
              <button type="submit" class="btnAddNew">Editar cargo</button>
            )}
            {
              mensagem !== "" && (
                <p>{mensagem}</p>
              )
            }
          </form>
        </div>
      )}
    </>
  );
}

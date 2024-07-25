import { useState } from "react";
import { pegaDataAtualDoContrato, mascaraCPF } from "../util";
import { createFuncionarioBancoDeDados } from "../db";

export default function Formulario({ nomeTabela, acao, tipoAcesso }) {
  const [novoFuncionario, setNovoFuncionario] = useState({
    contratacao: pegaDataAtualDoContrato(),
    email: '',
    modalidade: 'PRESENCIAL',
    nascimento: '',
    nome: '',
    turno: 'TURNO_A',
    usuario: {
      tipoDeAcesso: 'FUNCIONARIO',
      cpf: '',
      senha: '1234'
    }
  })

  console.log(novoFuncionario);

  const createFuncionario = async () => {
    const create = await createFuncionarioBancoDeDados({ ...novoFuncionario });
    console.log(create)
  }

  return (
    <>
      {nomeTabela === "Funcionario" && (
        <div className="addNewBox addNewFuncionario">
          <form
            action="submit"
            className="addNew addFuncionario"
            id="addFuncionario"
            onSubmit={(e) => { e.preventDefault(); if (acao === "Adicionando") {
              createFuncionario()
            } }}
          >
            <div className="blocoAddNew">
              <label for="name">Nome:</label>
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
              <label for="cpf">CPF:</label>
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
              <label for="data">Data de Nascimento:</label>
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
              <label for="email">E-mail:</label>
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
              <label for="turno">Turno:</label>
              <select
                className="inputFormDash"
                name="turno"
                id="turno"
                disabled={acao === "Editando" && tipoAcesso !== "GESTOR"}
                value={novoFuncionario.turno}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="TURNO_A">Escolha um turno</option>
                <option value="TURNO_A">Matutino</option>
                <option value="TURNO_B">Vespertino</option>
                <option value="TURNO_C">Noturno</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label for="modalidade">Modalidade:</label>
              <select
                className="inputFormDash"
                name="modalidade"
                id="modalidade"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.modalidade}
                onChange={(e) => setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value })}
              >
                <option value="PRESENCIAL">Escolha uma modalidade</option>
                <option value="REMOTO">Remoto</option>
                <option value="HIBRIDO">Hibrido</option>
                <option value="PRESENCIAL">Presencial</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label for="tipoDeAcesso">Acesso:</label>
              <select
                className="inputFormDash"
                name="tipoDeAcesso"
                id="tipoDeAcesso"
                disabled={tipoAcesso === "GESTOR"}
                value={novoFuncionario.usuario.tipoDeAcesso}
                onChange={(e) => { setNovoFuncionario({ ...novoFuncionario, usuario: { ...novoFuncionario.usuario, [e.target.name]: e.target.value } }); }}
                required
              >
                <option value="FUNCIONARIO">Escolha um acesso</option>
                <option value="GESTOR">Gestor</option>
                <option value="RH">RH</option>
                <option value="FUNCIONARIO">Funcionário</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label for="departamento">Departamento:</label>
              <select
                className="inputFormDash"
                name="departamento"
                id="departamento"
                disabled={tipoAcesso === "GESTOR"}
              >
                <option value="default">Escolha um departamento</option>
              </select>
            </div>

            <div className="blocoAddNew">
              <label for="cargo">Cargo:</label>
              <select className="inputFormDash" name="cargo" id="cargo" disabled={tipoAcesso === "GESTOR"}>
                <option value="default">Escolha um cargo</option>
              </select>
            </div>
            {acao === "Adicionando" && (
              <button type="submit" className="btnAddNew">Adicionar Funcionário</button>
            )}
            {acao === "Editando" && (
              <button className="btnAddNew">Editando Funcionário</button>
            )}
          </form>
        </div>
      )}
      {nomeTabela === "Departamento" && (
        <div class="addNewBox addNewDepartamento">
          <form
            action="submit"
            class="addNew addFuncionario"
            id="addFuncionario"
          >
            <div class="blocoAddNew">
              <label for="name">Nome:</label>
              <input
                class="inputFormDash"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label for="localizacao">Localização:</label>
              <input
                class="inputFormDash"
                type="text"
                name="localizacao"
                id="localizacao"
                placeholder="Nome"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label for="descricao">Descrição:</label>
              <input
                class="inputFormDash"
                type="text"
                name="descricao"
                id="descricao"
                placeholder="Nome"
                required
              />
            </div>

            {acao === "Adicionando" && (
              <button class="btnAddNew">Adicionar Departamento</button>
            )}
            {acao === "Editando" && (
              <button class="btnAddNew">Editando Departamento</button>
            )}
          </form>
        </div>
      )}
      {nomeTabela === "Cargo" && (
        <div class="addNewBox addNewCargo">
          <form
            action="submit"
            class="addNew addFuncionario"
            id="addFuncionario"
          >
            <div class="blocoAddNew">
              <label for="name">Nome:</label>
              <input
                class="inputFormDash"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label for="descricao">Descrição:</label>
              <input
                class="inputFormDash"
                type="text"
                name="descricao"
                id="descricao"
                placeholder="Nome"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label for="carga_horaria">Carga horária (em horas):</label>
              <input
                class="inputFormDash"
                type="number"
                name="carga_horaria"
                id="carga_horaria"
                placeholder="Nome"
                required
              />
            </div>

            <div class="blocoAddNew">
              <label for="salario">Salário:</label>
              <input
                class="inputFormDash"
                type="number"
                name="salario"
                id="salario"
                placeholder="Nome"
                required
              />
            </div>
            {acao === "Adicionando" && (
              <button class="btnAddNew">Adicionar cargo</button>
            )}
            {acao === "Editando" && (
              <button class="btnAddNew">Editando cargo</button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { getAllForIdFuncionarioAlocacao, getAllFuncionarioBancoDeDados } from "../db";
import { converterDataContratacao, converterDataNascimento } from "../util";

export default function TabelaDeVisualizar({ nomeTabela, visualizar }) {
  const [tabela, setTabela] = useState([])
  const [alocacao, setAlocacao] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (nomeTabela !== "Funcionario") {
        setTabela(await getAllFuncionarioBancoDeDados());
      }
      if (nomeTabela === "Funcionario") {
        setAlocacao(await getAllForIdFuncionarioAlocacao(visualizar.id))
      }
    }

    fetchData();

  }, []);

  return (
    <>
      {nomeTabela === "Funcionario" && (
        <>
          <div className="tableContainer">
            <table className="tableView" id="table_view">
              <thead>
                <tr className="tableCabecalho">
                  <th colSpan="2">Nome Completo</th>
                  <th colSpan="2">E-mail</th>
                  <th colSpan="1">Data de Nascimento</th>
                  <th colSpan="1">CPF</th>
                  <th colSpan="1">Data de Contratação</th>
                  <th colSpan="1">Tipo De Acesso</th>
                  <th colSpan="2">Cargo</th>
                  <th colSpan="1">Salario</th>
                  <th colSpan="2">Departamento</th>
                  <th colSpan="1">Turno</th>
                </tr>
              </thead>
              <tbody className="tableBody" id="table_body">
                {visualizar && (
                  <tr>
                    <td colSpan="2">{visualizar.nome !== null ? visualizar.nome : 'Sem nome'}</td>
                    <td colSpan="2">{visualizar.email !== null ? visualizar.email : 'Sem email'}</td>
                    <td colSpan="1">{visualizar.nascimento !== null ? converterDataNascimento(visualizar.nascimento) : 'Sem nascimento'}</td>
                    <td colSpan="1">{visualizar.usuario.cpf !== null ? visualizar.usuario.cpf : 'Sem CPF'}</td>
                    <td colSpan="1">{visualizar.contratacao !== null ? converterDataContratacao(visualizar.contratacao) : 'Sem contrataçao'}</td>
                    <td colSpan="1">{visualizar.usuario.tipoDeAcessoEnum !== null ? visualizar.usuario.tipoDeAcessoEnum : 'Sem Acesso'}</td>
                    <td colSpan="2">{visualizar.cargo !== null ? visualizar.cargo.nome : 'Sem Cargo'}</td>
                    <td colSpan="1">{visualizar.cargo !== null ? (visualizar.cargo.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sem Salario'}</td>
                    <td colSpan="2">
                      {visualizar.departamento !== null ? visualizar.departamento.nomeDepartamento : 'Sem Departamento'}
                    </td>
                    <td colSpan="1">{visualizar.turno !== null ?
                      (visualizar.turno === 'TURNO_A' ? 'Matutino' :
                        visualizar.turno === 'TURNO_B' ? 'Vespertino' : 'Noturno'
                      ) : 'Sem turno'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="tableContainer">
            <table className="tableView" id="table_view">
              <thead>
                <tr className="tableCabecalho">
                  <th colSpan="5">Alteração</th>
                  <th colSpan="2">Data de Alteração</th>
                </tr>
              </thead>
              <tbody className="tableBody" id="table_body">
                {

                  alocacao.map(({ alteracao, dataAtualizacao }, index) => (
                    <tr key={index}>
                      <th colSpan="5">{alteracao === 'null' ? 'Houve uma alteração de cargo ou departamento' : alteracao}</th>
                      <th colSpan="2">{converterDataNascimento(dataAtualizacao)}</th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </>
      )}
      {nomeTabela === "Departamento" && (
        <div className="tableContainer">
          <table className="tableView" id="table_view">
            <thead>
              <tr className="tableCabecalho">
                <th colSpan="3">Nome</th>
                <th colSpan="5">Localização</th>
                <th colSpan="5">Descrição</th>
                <th colSpan="1">Quatidade de funcionario</th>
                <th colSpan="2">Gestor</th>
              </tr>
            </thead>
            <tbody className="tableBody" id="table_body">
              {visualizar && (
                <tr>
                  <td colSpan="3">{visualizar.nomeDepartamento !== null ? visualizar.nomeDepartamento : 'Sem nome de Departamento'}</td>
                  <td colSpan="5">{visualizar.localizacao !== null ? visualizar.localizacao : 'Sem localização'}</td>
                  <td colSpan="5">{visualizar.descricao !== null ? visualizar.descricao : 'Sem descrição'}</td>
                  <td colSpan="1">{tabela.filter(({ departamento }) => departamento !== null && departamento.nomeDepartamento === visualizar.nomeDepartamento).length}</td>
                  <td colSpan="2">{tabela.filter(({ departamento, usuario }) => departamento !== null && departamento.nomeDepartamento === visualizar.nomeDepartamento && usuario.tipoDeAcessoEnum === "GESTOR").length > 0 ? tabela.filter(({ departamento, usuario }) => departamento !== null && departamento.nomeDepartamento === visualizar.nomeDepartamento && usuario.tipoDeAcessoEnum === "GESTOR")[0].nome : 'Não há Gestor'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {nomeTabela === "Cargo" && (
        <div className="tableContainer">
          <table className="tableView" id="table_view">
            <thead>
              <tr className="tableCabecalho">
                <th colSpan="2">Nome</th>
                <th colSpan="5">Descrição</th>
                <th colSpan="1">Carga horaria (em horas semanais)</th>
                <th colSpan="1">Salario</th>
                <th colSpan="1">Quantidade de funcionarios</th>
              </tr>
            </thead>
            <tbody className="tableBody" id="table_body">
              {visualizar && (
                <tr>
                  <td colSpan="2">{visualizar.nome !== null ? visualizar.nome : 'Sem nome do cargo'}</td>
                  <td colSpan="5">{visualizar.descricao !== null ? visualizar.descricao : 'Sem nome de descrição'}</td>
                  <td colSpan="1">{visualizar.cargaHoraria !== null ? `${visualizar.cargaHoraria} horas semanais` : 'Sem cargo horaria'}</td>
                  <td colSpan="1">{visualizar.salario !== null ? (visualizar.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sem salario'}</td>
                  <td colSpan="1">{tabela.filter(({ cargo }) => cargo !== null && cargo.nome === visualizar.nome).length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

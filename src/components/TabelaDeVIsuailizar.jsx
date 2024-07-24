export default function TabelaDeVisualizar({ nomeTabela, visualizar }) {
  return (
    <>
      {nomeTabela === "Funcionario" && (
        <>
          <div className="tableContainer">
            <table className="tableView" id="table_view">
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
              <tbody className="tableBody" id="table_body">
                {visualizar && (
                  <tr>
                    <td colSpan="2">{visualizar.nome}</td>
                    <td colSpan="2">{visualizar.email}</td>
                    <td colSpan="1">{visualizar.nascimento}</td>
                    <td colSpan="1">{visualizar.usuario.cpf}</td>
                    <td colSpan="1">{visualizar.contratacao}</td>
                    <td colSpan="1">{visualizar.usuario.tipoDeAcessoEnum}</td>
                    <td colSpan="2">{visualizar.cargo.nome}</td>
                    <td colSpan="1">{visualizar.cargo.salario}</td>
                    <td colSpan="2">
                      {visualizar.departamento.nomeDepartamento}
                    </td>
                    <td colSpan="1">{visualizar.turno}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="tableContainer">
            <table className="tableView" id="table_view">
              <tr className="tableCabecalho">
                <th colSpan="5">Alteração</th>
                <th colSpan="2">Data de Alteração</th>
              </tr>
              <tbody className="tableBody" id="table_body">
                <tr>
                  <th colSpan="5">Alteração</th>
                  <th colSpan="2">Data de Alteração</th>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {nomeTabela === "Departamento" && (
        <div className="tableContainer">
          <table className="tableView" id="table_view">
            <tr className="tableCabecalho">
              <th colSpan="3">Nome</th>
              <th colSpan="5">Localização</th>
              <th colSpan="5">Descrição</th>
              <th colSpan="1">Quatidade de funcionario</th>
              <th colSpan="2">Gestor</th>
            </tr>
            <tbody className="tableBody" id="table_body">
              {visualizar && (
                <tr>
                  <td colSpan="3">{visualizar.nomeDepartamento}</td>
                  <td colSpan="5">{visualizar.localizacao}</td>
                  <td colSpan="5">{visualizar.descricao}</td>
                  <td colSpan="1">50</td>
                  <td colSpan="2">Gestor</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {nomeTabela === "Cargo" && (
        <div className="tableContainer">
          <table className="tableView" id="table_view">
            <tr className="tableCabecalho">
              <th colSpan="2">Nome</th>
              <th colSpan="5">Descrição</th>
              <th colSpan="1">Carga horaria (em horas semanais)</th>
              <th colSpan="1">Salario</th>
              <th colSpan="1">Quantidade de funcionarios</th>
            </tr>
            <tbody className="tableBody" id="table_body">
                {
                    visualizar && (

              <tr>
                <td colSpan="2">{visualizar.nome}</td>
                <td colSpan="5">{visualizar.descricao}</td>
                <td colSpan="1">{visualizar.cargaHoraria}</td>
                <td colSpan="1">{visualizar.salario}</td>
                <td colSpan="1">10</td>
              </tr>
                    )
                }
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

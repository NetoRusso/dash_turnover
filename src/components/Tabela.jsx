import Deletar from "../img/delete_btn.png";
import Update from "../img/edit_btn.png";
import View from "../img/view_btn.png";

export default function Tabela({
  tabelaTitulos: { titulos, colospan, nome },
  tabelaDados,
  tipoAcesso,
  botaoVisual,
}) {
  return (
    <div className="tableContainer">
      <table className="tableView" id="table_view">
        <tr className="tableCabecalho">
          {titulos.map((name, index) => (
            <th key={index} colSpan={colospan[index]}>
              {name}
            </th>
          ))}
          <th>Visualizar</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
        <tbody className="tableBody" id="table_body">
          {tabelaDados.map((dado, index) => (
            <tr key={index}>
              {nome === "Funcionario" && (
                <>
                  <td colSpan="3">{dado.nome}</td>
                  <td colSpan="3">{dado.contratacao}</td>
                  <td colSpan="2">{dado.turno}</td>
                  <td colSpan="2">{dado.cargo.nome}</td>
                  <td colSpan="2">{dado.departamento.nomeDepartamento}</td>
                  <td colSpan="2">{dado.cargo.salario}</td>
                </>
              )}
              {nome === "Departamento" && (
                <>
                  <td colSpan="2">{dado.nomeDepartamento}</td>
                  <td colSpan="5">{dado.localizacao}</td>
                  <td colSpan="7">{dado.descricao}</td>
                </>
              )}
              {
                nome === "Cargo" && (
                  <>
                    <td colSpan="3">{dado.nome}</td>
                    <td colSpan="5">{dado.descricao}</td>
                    <td colSpan="1">{dado.cargaHoraria}</td>
                    <td colSpan="2">{dado.salario}</td>
                  </>
                )
              }
              <td>
                <button
                  onClick={botaoVisual}
                  className="btnTabela"
                  disabled={
                    nome === "Departamento" && tipoAcesso === "GESTOR"
                  }
                >
                  <img
                    src={View}
                    alt="btn visualizar"
                    className="visualizarBtn btnTabela"
                    id="visualizar_btn"
                  />
                </button>
              </td>
              <td>
                <button
                  onClick={() => console.log("aqui 2")}
                  className="btnTabela"
                  disabled={(nome === "Departamento" && tipoAcesso !== "CEO") || (nome === "Cargo" && tipoAcesso !== "CEO")}
                >
                  <img
                    src={Update}
                    alt="btn Editar"
                    className="editarBtn btnTabela"
                    id="editar_btn"
                  />
                </button>
              </td>
              <td>
                <button
                  onClick={() => console.log("aqui 3")}
                  className="btnTabela"
                  disabled={
                    (nome === "Funcionario" && tipoAcesso === "GESTOR") || (
                      nome === "Departamento" && tipoAcesso !== "CEO"
                    ) || (
                      nome === "Cargo" && tipoAcesso !== "CEO"
                    )
                  }
                >
                  <img
                    src={Deletar}
                    alt="btn Deletar"
                    className="deletarBtn btnTabela"
                    id="deletar_btn"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

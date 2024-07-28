import Deletar from "../img/delete_btn.png";
import Update from "../img/edit_btn.png";
import View from "../img/view_btn.png";
import { converterDataContratacao } from "../util";

export default function Tabela({
  tabelaTitulos: { titulos, colospan, nome },
  tabelaDados,
  tipoAcesso,
  botaoVisual,
  botaoEditar,
  botaoExcluir,
  usuario,
}) {
  return (
    <div className="tableContainer">
      <table className="tableView" id="table_view">
        <thead>
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
        </thead>
        <tbody className="tableBody" id="table_body">
          {
            tabelaDados.length > 0 && nome && (
              <>
                {tabelaDados.map((dado, index) => (
                  <tr key={index}>
                    {nome === "Funcionario" && 'modalidade' in dado && (
                      <>
                        <td colSpan="3">{dado.nome !== null ? dado.nome : 'Sem nome'}</td>
                        <td colSpan="3">{dado.contratacao !== null ? converterDataContratacao(dado.contratacao) : 'Sem contratacao'}</td>
                        <td colSpan="2">{dado.turno !== null ?
                          (dado.turno === 'TURNO_A' ? 'Matutino' :
                            dado.turno === 'TURNO_B' ? 'Vespertino' : 'Noturno'
                          ) : 'Sem turno'}</td>
                        <td colSpan="2">{dado.departamento !== null ? dado.departamento.nomeDepartamento : 'Sem departamento'}</td>
                        <td colSpan="2">{dado.cargo !== null ? dado.cargo.nome : 'Sem cargo'}</td>
                        <td colSpan="2">{dado.cargo !== null ? (dado.cargo.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sem salario'}</td>
                      </>
                    )}
                    {nome === "Departamento" && 'localizacao' in dado && (
                      <>
                        <td colSpan="2">{dado.nomeDepartamento !== null ? dado.nomeDepartamento : 'Sem nome'}</td>
                        <td colSpan="5">{dado.localizacao !== null ? dado.localizacao : 'Sem localizacao'}</td>
                        <td colSpan="7">{dado.descricao !== null ? dado.descricao : 'Sem descricao'}</td>
                      </>
                    )}
                    {
                      nome === "Cargo" && 'cargaHoraria' in dado && (
                        <>
                          <td colSpan="3">{dado.nome !== null ? dado.nome : 'Sem nome'}</td>
                          <td colSpan="5">{dado.descricao !== null ? dado.descricao : 'Sem descricao'}</td>
                          <td colSpan="1">{dado.cargaHoraria !== null ? `${dado.cargaHoraria} horas semanais` : 'Sem carga horaria'}</td>
                          <td colSpan="2">{dado.salario !== null ? (dado.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sem salario'}</td>
                        </>
                      )
                    }
                    <td>
                      <button
                        onClick={() => botaoVisual(dado)}
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
                        onClick={() => botaoEditar(dado)}
                        className="btnTabela"
                        disabled={(nome === "Departamento" && tipoAcesso !== "CEO") || (nome === "Cargo" && tipoAcesso !== "CEO") || (nome === "Funcionario" && usuario.id === dado.id)}
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
                        onClick={() => botaoExcluir(dado)}
                        className="btnTabela"
                        disabled={
                          (nome === "Funcionario" && tipoAcesso === "GESTOR") || (
                            nome === "Departamento" && tipoAcesso !== "CEO"
                          ) || (
                            nome === "Cargo" && tipoAcesso !== "CEO"
                          ) || (nome === "Funcionario" && usuario.id === dado.id)
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
              </>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

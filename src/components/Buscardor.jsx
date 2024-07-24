export default function Buscador({
  nomeTabela,
  tipoAcesso,
  tipoAcao: { nomeAcao, tipo },
  botaoNovo
}) {
  return (
    <div className="searchTable">
      <h4 className="titleTableView" id="title_table_view">
        {nomeAcao} {nomeTabela}
      </h4>
      <div className="buscador">
        {tipo === "tabela" && (
          <input
            className="searchTableInput"
            id="search_table_input"
            type="text"
            placeholder="Buscar..."
          />
        )}
        {/*
          <button style={{}} className="searchTableBtn btnStand" id="search_table_btn">
            Buscar
          </button>
        */}
      </div>
      {((nomeTabela === "Funcionario" && tipoAcesso !== "GESTOR") ||
        ((nomeTabela === "Departamento" || nomeTabela === "Cargo") &&
          tipoAcesso === "CEO")) && tipo === 'tabela' && (
        <button className="addBtn btnStand" id="add_btn" onClick={botaoNovo}>
          Novo+
        </button>
      )}
    </div>
  );
}

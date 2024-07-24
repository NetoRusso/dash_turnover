export default function Buscador({ nomeTabela, tipoAcesso }) {
  return (
    <div className="searchTable">
      <h4 className="titleTableView" id="title_table_view">
        Tabela {nomeTabela}
      </h4>
      <div className="buscador">
        <input
          className="searchTableInput"
          id="search_table_input"
          type="text"
          placeholder="Buscar..."
        />
        {/*
          <button style={{}} className="searchTableBtn btnStand" id="search_table_btn">
            Buscar
          </button>
        */}
      </div>
      {((nomeTabela === "Funcionario" && tipoAcesso !== "GESTOR") ||
        ((nomeTabela === "Departamento" || nomeTabela === "Cargo") &&
          tipoAcesso === "CEO" )) && (
            <button className="addBtn btnStand" id="add_btn">
              Novo+
            </button>
          )}
    </div>
  );
}

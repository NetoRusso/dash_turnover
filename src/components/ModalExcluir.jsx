import ReactModal from "react-modal";

export default function ModalExcluir({ open, nomeTabela, nome, botaoCancelar }) {
  return (
    <ReactModal
      contentLabel="ModalImage"
      isOpen={open}
      className="modal"
      style={{
        overlay: {
          backgroundColor: "rgba(36,32,33,0.5)",
          zIndex: "9999",
        },
      }}
    >
      <div className="conteudoModal">
        <p className="mensagemModal">O {nomeTabela} {nome.nome ? nome.nome : nome.nomeDepartamento} pode ser removido ?</p>
        <div className="botoesModal">
          <button className="okMsgModalBtn">Confirmar</button>
          <button className="okMsgModalBtn cancelarModalBtn" onClick={botaoCancelar}>Cancelar</button>
        </div>
      </div>
    </ReactModal>
  );
}

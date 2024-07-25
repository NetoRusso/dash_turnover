import ReactModal from "react-modal";

export default function ModalMensagem({ open, nome, botaoConfirmandoFuncionario, fecharModal }) {
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
                <p className="mensagemModal">Gostaríamos de informar que o novo {nome} foi cadastrado com sucesso!</p>
                <div className="botoesModal">
                    <button type="button" className="okMsgModalBtn" onClick={() => { botaoConfirmandoFuncionario(); fecharModal(); }}>Confirmar</button>
                </div>
            </div>
        </ReactModal>
    );
}
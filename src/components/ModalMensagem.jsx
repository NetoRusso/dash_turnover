import ReactModal from "react-modal";


export default function ModalMensagem({
  open,
  nome,
  fecharModal,
  botaoConfirmandoFuncionario,
  botaoConfirmandoDepartamento,
  botaoConfirmandoCargo,
  acao,
}) {

  const botaoConfirmacao = () => {
    if (nome === "Funcionario") {
      botaoConfirmandoFuncionario();
    } else if (nome === "Departamento") {
      botaoConfirmandoDepartamento();
    } else {
      botaoConfirmandoCargo();
    }

    fecharModal();
  }


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
        {
          acao === "Adicionando" ? (
            <p className="mensagemModal">O novo {nome} foi cadastrado com sucesso!</p>
          ) : (
            <p className="mensagemModal">O {nome} foi atualizado com sucesso!</p>
          )
        }
        <div className="botoesModal">
          <button type="button" className="okMsgModalBtn" onClick={botaoConfirmacao}>Confirmar</button>
        </div>
      </div>
    </ReactModal>
  );
}
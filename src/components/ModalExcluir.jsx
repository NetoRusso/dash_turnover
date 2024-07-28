import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { deleteCargoBancoDeDados, deleteDepartamentoBancoDeDados, deleteFuncionarioBancoDeDados } from "../db";

export default function ModalExcluir({ open, nomeTabela, nome, botaoFecharModal, id, atualizandoTabela }) {
  const [mensagem, setMensagem] = useState('')
  
  const excluirFuncionario =  async () => {
    const excluir = await deleteFuncionarioBancoDeDados(id);

    if (!excluir.ok) {
      setMensagem(excluir.mensagem);
    }

    if (excluir.ok) {
      atualizandoTabela();
      botaoFecharModal();
    }
  }

  const excluirDepartamento = async () => {
    const excluir = await deleteDepartamentoBancoDeDados(id);
  
    if (!excluir.ok) {
      setMensagem(excluir.mensagem);
    }

    if (excluir.ok) {
      atualizandoTabela();
      botaoFecharModal();
    }
  }

  const excluirCargo = async () => {
    const excluir = await deleteCargoBancoDeDados(id);
  
    if (!excluir.ok) {
      setMensagem(excluir.mensagem);
    }

    if (excluir.ok) {
      atualizandoTabela();
      botaoFecharModal();
    }
  }

  useEffect(() => {
    if (mensagem !== '') {
      setTimeout(() => {
        setMensagem('')
      }, 10000)
    }
  }, [mensagem])

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
        {
          mensagem !== '' && (
            <p>{mensagem}</p>
          )
        }
        <div className="botoesModal">
          <button type="button" className="okMsgModalBtn" onClick={async () => {
            if (nomeTabela === "Funcionario") {
              await excluirFuncionario()
            } else if (nomeTabela === "Departamento") {
              await excluirDepartamento()
            } else {
              await excluirCargo()
            }
          }}>Confirmar</button>
          <button type="button" className="okMsgModalBtn cancelarModalBtn" onClick={botaoFecharModal}>Cancelar</button>
        </div>
      </div>
    </ReactModal>
  );
}


export const mascaraCPF = (cpf) => {
  let value = cpf.replace(/\D/g, ''); // Remove tudo que não é dígito
  value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
  value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o traço
  return value;
};

export const mascaraDinheiro = (valor) => {
  let value = removeDigitos(valor)
  value = value.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
  return value;
}

export const removeDigitos = (value) => {
  return value.replace(/\D/g, '');
};

export const pegaDataAtualDoContrato = () => {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataAtual.getDate().toString().padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
};

export const transformarMascaraDeDinheiroParaFloat = (valor) => {
  let valorDinheiro = removeDigitos(valor)
  valorDinheiro = valorDinheiro.replace(/(\d+)(\d{2})$/, "$1.$2");
  valorDinheiro = Number(valorDinheiro)
  return valorDinheiro
}

export const formatoFuncionarioParaAlterar = (dados, novo) => {
  return {
    nome: dados.nome !== novo.nome ? novo.nome !== null ? novo.nome : dados.nome : dados.nome,
    nascimento: dados.nascimento,
    contratacao: dados.contratacao,
    email: dados.email !== novo.email ? novo.email !== null ? novo.email : dados.email : dados.email,
    turno: dados.turno !== novo.turno ? novo.turno !== null ? novo.turno : dados.turno : dados.turno,
    modalidade: dados.modalidade !== novo.modalidade ? novo.modalidade !== null ? novo.modalidade : dados.modalidade : dados.modalidade,
    cargo: dados.cargo !== novo.cargo ? novo.cargo : dados.cargo,
    departamento: dados.departamento !== novo.departamento ? novo.departamento : dados.departamento,
    usuario: {
        cpf: dados.usuario.cpf,
        senha: dados.usuario.senha,
        tipoDeAcesso: dados.usuario.tipoDeAcesso !== novo.usuario.tipoDeAcesso ? novo.usuario.tipoDeAcesso : dados.usuario.tipoDeAcesso
    }
  }
} 
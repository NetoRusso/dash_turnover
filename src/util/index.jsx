
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

export const formatoFuncionarioParaAlterar = (novo) => {
  return {
    nome: novo.nome,
    nascimento: novo.nascimento,
    contratacao: novo.contratacao,
    email: novo.email,
    turno: novo.turno,
    modalidade: novo.modalidade,
    cargo: `${novo.cargo === null ? '' : novo.cargo}`,
    departamento: "83a5d843-01e9-4874-b35d-907563dddabb",
    usuario: {
        cpf: "706.994.752-60",
        senha: "1234",
        tipoDeAcesso: "CEO"
    }
  }
} 
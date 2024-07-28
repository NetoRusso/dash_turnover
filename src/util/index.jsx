
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

export const formatoFuncionarioParaAlterar = (dados) => {
  return {
    nome: (dados.nome === null ? '' : dados.nome),
    nascimento: (dados.nascimento === null ? '' : dados.nascimento.replace("T00:00:00.000+00:00", "")),
    email: (dados.email === null ? '' : dados.email),
    contratacao: (dados.contratacao === null ? pegaDataAtualDoContrato() : dados.contratacao),
    turno: (dados.turno === null ? '' : dados.turno),
    modalidade: (dados.modalidade === null ? '' : dados.modalidade),
    cargo: (dados.cargo === null ? '' : dados.cargo.id),
    departamento: (dados.departamento === null ? '' : dados.departamento.id),
    usuario: {
      cpf: (dados.usuario.cpf === null ? '' : dados.usuario.cpf),
      senha: (dados.usuario.senha === null ? '' : dados.usuario.senha),
      tipoDeAcesso: (dados.usuario.tipoDeAcessoEnum === null ? '' : dados.usuario.tipoDeAcessoEnum),
    }
  }
};

export const validadorAlteracaoFuncionario = (antigoDado, novaEntrada) => {
  return {
    nome: antigoDado.nome !== novaEntrada.nome && novaEntrada.nome !== "" ? novaEntrada.nome : antigoDado.nome,
    nascimento: antigoDado.nascimento,
    contratacao: antigoDado.contratacao,
    email: antigoDado.email !== novaEntrada.email && novaEntrada.email !== "" ? novaEntrada.email : antigoDado.email,
    turno: antigoDado.turno !== novaEntrada.turno && novaEntrada.turno !== "" ? novaEntrada.turno : antigoDado.turno,
    modalidade: antigoDado.modalidade !== novaEntrada.modalidade && novaEntrada.modalidade !== "" ? novaEntrada.modalidade : antigoDado.modalidade,
    cargo: antigoDado.cargo === novaEntrada.cargo ? antigoDado.cargo : novaEntrada.cargo,
    departamento: antigoDado.departamento === novaEntrada.departamento ? antigoDado.departamento : novaEntrada.departamento,
    usuario: {
      cpf: antigoDado.usuario.cpf,
      senha: 1234,
      tipoDeAcesso: antigoDado.usuario.tipoDeAcessoEnum !== novaEntrada.usuario.tipoDeAcesso ?
        (novaEntrada.usuario.tipoDeAcesso !== "" ? novaEntrada.usuario.tipoDeAcesso : antigoDado.usuario.tipoDeAcessoEnum)
        : antigoDado.usuario.tipoDeAcessoEnum
    }
  }
}

export const converterDataContratacao = (data) => {
  // Separa os componentes da data original
  const partes = data.split('-');
  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];

  // Reconstroi a data no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

export const converterDataNascimento = (dataISO) => {
  // Cria um objeto Date a partir da string ISO 8601
  const data = new Date(dataISO);

  // Formata a data para o formato "YYYY-MM-DD"
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário
  const dia = data.getDate().toString().padStart(2, '0');
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

export const filterTabela = (tabela, palavra, tipo) => {
  if (tipo === "Funcionario") {
    return tabela.filter(({ nome, cargo, departamento }) =>
      nome.toLowerCase().indexOf(palavra.toLowerCase()) !== -1 ||
      (cargo === null ? 'Sem cargo' : cargo.nome).toLowerCase().indexOf(palavra.toLowerCase()) !== -1 ||
      (departamento === null ? 'Sem departamento' : departamento.nomeDepartamento).toLowerCase().indexOf(palavra.toLowerCase()) !== -1
    );

  } else if (tipo === "Departamento") {
    return tabela.filter(({ nomeDepartamento }) =>
      nomeDepartamento.toLowerCase().indexOf(palavra.toLowerCase()) !== -1
    );

  } else {
    return tabela.filter(({ nome }) =>
      nome.toLowerCase().indexOf(palavra.toLowerCase()) !== -1
    );
  }
}

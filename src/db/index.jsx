import { cpf } from 'cpf-cnpj-validator';
import { validadorAlteracaoFuncionario } from "../util";

const HOST = `http://localhost:8080`

let authBancoDeDados;
let gestor = false;
let usuario = {};

// Login Credenciais do Banco de Dados
export const loginBancoDeDados = async (cpf, auth) => {
  const login = await fetch(`${HOST}/funcionario/cpf/${cpf}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`
    }
  }).then(res => res.json()).catch(err => console.log(err));

  authBancoDeDados = auth;
  gestor = (login.usuario.tipoDeAcessoEnum === "GESTOR")
  usuario = login

  if (login) {
    return { ...login, auth: auth };
  }
}

export const verificarLoginBancoDeDados = async (cpf, auth) => {
  const login = await fetch(`${HOST}/funcionario/cpf/${cpf}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`
    }
  }).then(res => res.json()).catch(err => console.log(err));

  return login
}


// Funcionarios

export const getAllFuncionarioBancoDeDados = async () => {
  let funcionarios = await fetch(`${HOST}/funcionario`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.json()).then(res => res.filter(({usuario}) => usuario.tipoDeAcessoEnum !== "CEO")).catch(err => console.log(err));

  funcionarios = funcionarios.filter(({id}) => usuario.id !== id)
  
  if (gestor && usuario.departamento !== null) {
    funcionarios = funcionarios.filter(({ departamento }) => departamento !== null && departamento.id === usuario.departamento.id)
  }

  if (gestor && usuario.departamento === null) {
    funcionarios = []
  }

  return funcionarios;
};

export const createFuncionarioBancoDeDados = async (funcionario) => {
  if (!cpf.isValid(funcionario.usuario.cpf)) {
    return { mensagem: 'CPF inválido', ok: false }
  }

  const login = await verificarLoginBancoDeDados(funcionario.usuario.cpf, authBancoDeDados)

  if (login) {
    return { mensagem: 'Usuario já cadastrado', ok: false }
  }

  const createFuncionario = await fetch(`${HOST}/funcionario/salvar`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(funcionario)
  }).then(res => res.ok ? { mensagem: `Funcionario cadastrado com sucesso`, ok: true } : { mensagem: 'funcionario não cadastrado', ok: false }).catch(err => console.log(err));


  return createFuncionario;
};

export const updateFuncionariosBancoDeDados = async (id, funcionarioNovo, funcionarioAntigo) => {
  const update = await fetch(`${HOST}/funcionario/atualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(validadorAlteracaoFuncionario(funcionarioAntigo, funcionarioNovo))
  }).then(res => res.ok ? { mensagem: 'Funcionario atualizado com Sucesso', ok: true } : { mensagem: 'Funcionario não atualizado', ok: false }).catch(err => console.log(err))

  return update
}

export const deleteFuncionarioBancoDeDados = async (id) => {
  const excluir = await fetch(`${HOST}/funcionario/${id}`, {
    method: "DELETE",
    headers:  { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.ok ? { mensagem: 'Funcionario excluido com Sucesso', ok: true } : { mensagem: 'Funcionario não pode ser excluido. Por favor tente novamente!', ok: false }).catch(err => console.log(err))

  return excluir;
}

// Departamento

export const getAllDepartamentoBancoDeDados = async () => {
  const departamentos = await fetch(`${HOST}/departamentos`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.json()).catch(err => console.log(err))

  return departamentos;
};

export const createDepartamentoBancoDeDados = async (departamento) => {
  const createDepartamento = await fetch(`${HOST}/departamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(departamento)
  }).then(res => res.ok ? { mensagem: 'Departamento cadastrado com Sucesso', ok: true } : { mensagem: 'Departamento não cadastrado', ok: false }).catch(err => console.log(err));

  return createDepartamento;
};

export const updateDepartamentoBancoDeDados = async (id, departamento) => {
  const update = await fetch(`${HOST}/departamentos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(departamento)
  }).then(res => res.ok ? { mensagem: 'Cargo atualizado com Sucesso', ok: true } : { mensagem: 'Cargo não atualizado', ok: false }).catch(err => console.log(err))

  return update
}

export const deleteDepartamentoBancoDeDados = async (id) => {
  const excluir = await fetch(`${HOST}/departamentos/${id}`, {
    method: "DELETE",
    headers:  { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.ok ? { mensagem: 'Departamento excluido com Sucesso', ok: true } : { mensagem: 'Departamento não pode ser excluido. Por favor tente novamente!', ok: false }).catch(err => console.log(err))

  return excluir;
}


// Cargo

export const getAllCargoBancoDeDados = async () => {
  const cargo = await fetch(`${HOST}/cargos`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
  }).then(res => res.json()).catch(err => console.log(err))
  
  return cargo;
};

export const createCargoBancoDeDados = async (cargo) => {
  const create = await fetch(`${HOST}/cargos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(cargo)
  }).then(res => res.ok ? { mensagem: 'Cargo cadastrado com Sucesso', ok: true } : { mensagem: 'Cargo não cadastrado', ok: false }).catch(err => console.log(err))

  return create;
}

export const updateCargoBancoDeDados = async (id, cargo) => {
  const update = await fetch(`${HOST}/cargos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(cargo)
  }).then(res => res.ok ? { mensagem: 'Cargo atualizado com Sucesso', ok: true } : { mensagem: 'Cargo não atualizado', ok: false }).catch(err => console.log(err))

  return update
}

export const deleteCargoBancoDeDados = async (id) => {
  const excluir = await fetch(`${HOST}/cargos/${id}`, {
    method: "DELETE",
    headers:  { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.ok ? { mensagem: 'Cargo excluido com Sucesso', ok: true } : { mensagem: 'Cargo não pode ser excluido. Por favor tente novamente!', ok: false }).catch(err => console.log(err))

  return excluir;
}


export const quantidadeDeFuncionarioPorCargo = async (cargoNome) => {
  const funcionario = await getAllFuncionarioBancoDeDados();
  
  const cargoPorFuncionario = funcionario.find(({ departamento, usuario }) => departamento !== null && departamento.nomeDepartamento === cargoNome && usuario.tipoDeAcessoEnum === "GESTOR")

  return cargoPorFuncionario.lenght
}

// alocacao 

export const getAllForIdFuncionarioAlocacao = async (id) => {
  const alocacao = await fetch(`${HOST}/alocacoes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
  }).then(res => res.json()).catch(err => console.log(err))
  
  return alocacao;
}
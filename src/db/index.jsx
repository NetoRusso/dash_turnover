import Cargo from "../json/cargo.json";
import Departamentos from "../json/departamentos.json";
import { cpf } from 'cpf-cnpj-validator';
import { validadorAlteracaoFuncionario } from "../util";

const HOST = `http://localhost:8080`

let authBancoDeDados;
let cpfBancoDeDados;
let gestor;

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
  cpfBancoDeDados = cpf;
  gestor = login.usuario.tipoDeAcessoEnum === "GESTOR"

  if (login) {
    return { ...login, auth: auth };
  }
}


// Funcionarios

export const getAllFuncionarioBancoDeDados = async () => {
  const funcionario = await fetch(`${HOST}/funcionario`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.json()).then(res => res.filter(e => e.usuario.tipoDeAcessoEnum !== "CEO")).catch(err => console.log(err));

  return funcionario;
};

export const createFuncionarioBancoDeDados = async (funcionario) => {
  if (!cpf.isValid(funcionario.usuario.cpf)) {
    return { mensagem: 'CPF inválido', ok: false }
  }

  const login = await loginBancoDeDados(funcionario.usuario.cpf, authBancoDeDados)

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

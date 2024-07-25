import Cargo from "../json/cargo.json";
import Departamentos from "../json/departamentos.json";
import Funcionarios from "../json/funcionarios.json";
import { cpf } from 'cpf-cnpj-validator';

let authBancoDeDados;
let cpfBancoDeDados;

export const departamentoBancoDeDados = () => {
  return Departamentos;
};



export const createDepartamentoBancoDeDados = async (departamento) => {
  const createDepartamento = await fetch("http://localhost:8080/departamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` },
    body: JSON.stringify(departamento)
  }).then(res => res.ok  ? "Departamento cadastrado com Sucesso" : 'Departamento não cadastrado').catch(err => console.log(err));

  return createDepartamento;
};



export const cargoBancoDeDados = () => {
  return Cargo;
};



export const funcionarioBancoDeDados = async () => {
  const funcionario = await fetch("http://localhost:8080/funcionario", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Basic ${authBancoDeDados}` }
  }).then(res => res.json()).then(res => res.filter(e => e.usuario.tipoDeAcessoEnum !== "CEO")).catch(err => console.log(err));

  return funcionario;
};

export const createFuncionarioBancoDeDados = async (funcionario) => {
    if (!cpf.isValid(funcionario.usuario.cpf)) {
      return {mensagem: 'CPF inválido', ok: false }
    }

    const login = await loginBancoDeDados(funcionario.usuario.cpf, authBancoDeDados)
  
    if (login) { 
      return {mensagem: 'Usuario já cadastrado', ok: false }
    }
  
    const createFuncionario = await fetch("http://localhost:8080/funcionario/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization": `Basic ${authBancoDeDados}` },
      body: JSON.stringify(funcionario)
    }).then(res => res.ok ? {mensagem: `Funcionario cadastrado com sucesso`, ok: true } : {mensagem: 'funcionario não cadastrado', ok: false }).catch(err => console.log(err));


  return createFuncionario;
};



// Login Credenciais do Banco de Dados
export const loginBancoDeDados = async (cpf, auth) => {
  const login = await fetch(`http://localhost:8080/funcionario/cpf/${cpf}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`
    }
  }).then(res => res.json()).catch(err => console.log(err));

  authBancoDeDados = auth;
  cpfBancoDeDados = cpf;

  if (login) {
    return { ...login, auth: auth };
  }
}
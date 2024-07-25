import Cargo from "../json/cargo.json";
import Departamentos from "../json/departamentos.json";
import Funcionarios from "../json/funcionarios.json";

export const departamentoBancoDeDados = () => {
    return Departamentos;
};

export  const cargoBancoDeDados = () => {
    return Cargo;
};

export const funcionarioBancoDeDados = () => {
    return Funcionarios;
};

export const loginBancoDeDados = async (cpf, auth) => {
    const login =  await fetch(`http://localhost:8080/funcionario/cpf/${cpf}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
        }
    }).then(res => res.json()).catch(err => console.log(err));

    return login;
}
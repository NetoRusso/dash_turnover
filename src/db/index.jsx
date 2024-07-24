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
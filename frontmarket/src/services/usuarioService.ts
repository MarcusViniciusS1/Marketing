import api from "./api";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
  telefone: string;
  empresaId?: number;
}

export interface UsuarioRequest {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  role: string;
  telefone: string;
  empresaId?: number;
}

// DTOs para Senha
export interface RecuperarSenhaDto { email: string; }
export interface RegistrarNovaSenhaDto { email: string; senha: string; token: string; }

export async function buscarUsuariosDaEmpresa(): Promise<Usuario[]> {
  const response = await api.get<Usuario[]>("/usuarios"); 
  return response.data;
}

export async function buscarUsuarioLogado(): Promise<Usuario> {
  const response = await api.get<Usuario>("/usuarios/me");
  return response.data;
}

export async function cadastrarUsuario(usuario: UsuarioRequest): Promise<Usuario> {
  const response = await api.post<Usuario>("/usuarios", usuario);
  return response.data;
}

export async function editarUsuario(usuario: UsuarioRequest): Promise<Usuario> {
  const response = await api.put<Usuario>("/usuarios/editar", usuario);
  return response.data;
}

export async function recuperarSenha(data: RecuperarSenhaDto): Promise<void> {
  await api.post("/auth/esquecisenha", data);
}

export async function registrarNovaSenha(data: RegistrarNovaSenhaDto): Promise<void> {
  await api.post("/auth/registrarnovasenha", data);
}
import api from "./api";

// --- Interfaces ---

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
  senha?: string; // Senha é opcional na edição
  role: string;
  telefone: string;
  empresaId?: number;
}

export interface RecuperarSenhaDto {
  email: string;
}

export interface RegistrarNovaSenhaDto {
  email: string;
  senha: string;
  token: string;
}

// --- Funções de Usuário e Equipe ---

export async function buscarUsuariosDaEmpresa(): Promise<Usuario[]> {
  // CORREÇÃO: Usa o endpoint inteligente que serve tanto para Admin quanto para Gerente
  const response = await api.get<Usuario[]>("/usuarios/minha-empresa"); 
  return response.data;
}

export async function buscarUsuarioLogado(): Promise<Usuario> {
  const response = await api.get<Usuario>("/usuarios/me");
  return response.data;
}

export async function buscarUsuarioPorId(id: number | string): Promise<Usuario> {
  const response = await api.get<Usuario>(`/usuarios/${id}`);
  return response.data;
}

export async function cadastrarUsuario(usuario: UsuarioRequest): Promise<Usuario> {
  // Garante que empresaId seja um número, se existir
  const payload = {
      ...usuario,
      empresaId: usuario.empresaId ? Number(usuario.empresaId) : undefined
  };
  const response = await api.post<Usuario>("/usuarios", payload);
  return response.data;
}

export async function editarUsuario(usuario: UsuarioRequest): Promise<Usuario> {
  const response = await api.put<Usuario>("/usuarios/editar", usuario); 
  return response.data;
}

export async function deletarUsuario(id: number): Promise<void> {
  await api.delete(`/usuarios/${id}`); 
}

// --- Funções de Recuperação de Senha ---

export async function recuperarSenha(data: RecuperarSenhaDto): Promise<void> {
  await api.post("/auth/esquecisenha", data);
}

export async function registrarNovaSenha(data: RegistrarNovaSenhaDto): Promise<void> {
  await api.post("/auth/registrarnovasenha", data);
}

export async function vincularEmpresa(empresaId: number): Promise<Usuario> {
  const response = await api.post<Usuario>(`/usuarios/vincularEmpresa?empresaId=${empresaId}`);
  return response.data;
}
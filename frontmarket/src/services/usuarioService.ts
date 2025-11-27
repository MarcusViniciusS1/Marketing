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
  senha?: string;
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
  // Endpoint ajustado para listar equipe ou todos
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
  const response = await api.post<Usuario>("/usuarios", usuario);
  return response.data;
}

export async function editarUsuario(usuario: UsuarioRequest): Promise<Usuario> {
  // Se for edição via Admin passando ID, pode precisar de endpoint específico ou usar o mesmo
  // Aqui usamos a lógica de "Upsert" do backend que verifica CPF/ID
  const response = await api.post<Usuario>("/usuarios", usuario); 
  return response.data;
}

export async function deletarUsuario(id: number): Promise<void> {
  // O Backend precisa ter o DELETE implementado no Controller, se não tiver, não funcionará.
  // Assumindo que você implementará ou já tem:
  // @DeleteMapping("/{id}") public ResponseEntity<Void> deletar(@PathVariable Long id)...
  // Se não tiver, adicione no UsuarioController.java
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
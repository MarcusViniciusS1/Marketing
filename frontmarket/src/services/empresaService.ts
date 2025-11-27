import api from "./api";

export interface Empresa {
  id: number;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  telefone: string;
  razaoSocial?: string;
  // Campos opcionais/legado
  setor?: string;
  cidade?: string;
  endereco?: string;
}

export interface EmpresaRequest {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export async function buscarMinhaEmpresa(): Promise<Empresa> {
  const response = await api.get<Empresa>("/empresas/minha");
  return response.data;
}

export async function salvarEmpresa(data: EmpresaRequest): Promise<Empresa> {
  const response = await api.post<Empresa>("/empresas/cadastrar", data);
  return response.data;
}

export async function atualizarEmpresa(data: EmpresaRequest): Promise<Empresa> {
  const response = await api.put<Empresa>("/empresas/minha", data);
  return response.data;
}

export async function buscarTodasEmpresas(): Promise<Empresa[]> {
  const response = await api.get<Empresa[]>("/empresas");
  return response.data;
}

export async function buscarEmpresaPorId(id: number | string): Promise<Empresa> {
  const response = await api.get<Empresa>(`/empresas/${id}`);
  return response.data;
}

export async function atualizarEmpresaAdmin(id: number | string, data: EmpresaRequest): Promise<Empresa> {
  const response = await api.put<Empresa>(`/empresas/${id}`, data);
  return response.data;
}

export async function deletarEmpresa(id: number): Promise<void> {
  await api.delete(`/empresas/${id}`);
}
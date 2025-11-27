import api from "./api";

export interface Campanha {
  id: number;
  nome: string;
  objetivo: string;
  orcamento: number;
  dataInicio: string;
  dataFim: string;
  status: 'PLANEJAMENTO' | 'ATIVA' | 'PAUSADA' | 'CONCLUIDA';
  canalNome: string;
  canalId: number;
  empresaId: number;
  empresaNome?: string; // Novo campo opcional
}

export interface CampanhaRequest {
  nome: string;
  objetivo: string;
  orcamento: number;
  dataInicio: string;
  dataFim: string;
  canalId: number;
}

export async function buscarCampanhas(): Promise<Campanha[]> {
  const response = await api.get<Campanha[]>("/campanhas");
  return response.data;
}

export async function buscarCampanhaPorId(id: number | string): Promise<Campanha> {
  const response = await api.get<Campanha>(`/campanhas/${id}`);
  return response.data;
}

export async function salvarCampanha(data: CampanhaRequest, id?: number): Promise<Campanha> {
  if (id) {
    const response = await api.put<Campanha>(`/campanhas/${id}`, data);
    return response.data;
  }
  const response = await api.post<Campanha>("/campanhas", data);
  return response.data;
}

export async function deletarCampanha(id: number): Promise<void> {
  await api.delete(`/campanhas/${id}`);
}
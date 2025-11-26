import { useEffect, useState } from "react";
import { buscarCampanhas, type Campanha } from "../../../services/campanhaService";

export default function Dashboard() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);

  useEffect(() => {
    buscarCampanhas().then(setCampanhas).catch(console.error);
  }, []);

  // Cálculos de KPI
  const totalOrcamento = campanhas.reduce((acc, c) => acc + c.orcamento, 0);
  const ativas = campanhas.filter(c => c.status === 'ATIVA').length;
  const planejamento = campanhas.filter(c => c.status === 'PLANEJAMENTO').length;

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4 fw-bold text-dark">Visão Geral</h2>
      
      {/* Cards de KPI */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm text-white bg-primary h-100">
            <div className="card-body">
              <h6 className="card-title text-white-50 text-uppercase small fw-bold">Campanhas Ativas</h6>
              <h2 className="display-5 fw-bold mb-0">{ativas}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm text-white bg-success h-100">
            <div className="card-body">
              <h6 className="card-title text-white-50 text-uppercase small fw-bold">Budget Total</h6>
              <h2 className="display-5 fw-bold mb-0">R$ {totalOrcamento.toLocaleString('pt-BR')}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-white h-100">
            <div className="card-body">
              <h6 className="card-title text-muted text-uppercase small fw-bold">Em Planejamento</h6>
              <h2 className="display-5 fw-bold mb-0 text-dark">{planejamento}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Resumo */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Últimas Campanhas</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Nome</th>
                  <th>Canal</th>
                  <th>Status</th>
                  <th>Término</th>
                </tr>
              </thead>
              <tbody>
                {campanhas.slice(0, 5).map((c) => (
                  <tr key={c.id}>
                    <td className="ps-4 fw-semibold">{c.nome}</td>
                    <td><span className="badge bg-light text-dark border">{c.canalNome}</span></td>
                    <td>
                      <span className={`badge rounded-pill bg-${c.status === 'ATIVA' ? 'success' : 'secondary'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{new Date(c.dataFim).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
                {campanhas.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">Nenhuma campanha encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { buscarCampanhas, type Campanha } from "../../../services/campanhaService";

export default function Dashboard() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);

  useEffect(() => {
    buscarCampanhas().then(setCampanhas).catch(console.error);
  }, []);

  const totalOrcamento = campanhas.reduce((acc, c) => acc + c.orcamento, 0);
  const ativas = campanhas.filter(c => c.status === 'ATIVA').length;

  // Componente de Card KPI Reutilizável
  const KpiCard = ({ title, value, icon, color }: any) => (
    <div className="col-md-4">
      <div className="card h-100 p-3 d-flex flex-row align-items-center">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
             style={{ width: 60, height: 60, backgroundColor: `${color}20`, color: color }}>
          <i className={`bi ${icon} fs-2`}></i>
        </div>
        <div>
          <p className="text-muted mb-0 small text-uppercase fw-bold">{title}</p>
          <h3 className="fw-bold mb-0 text-dark">{value}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* KPIs */}
      <div className="row g-4 mb-4">
        <KpiCard title="Campanhas Ativas" value={ativas} icon="bi-activity" color="#4318FF" />
        <KpiCard title="Investimento Total" value={`R$ ${totalOrcamento.toLocaleString()}`} icon="bi-wallet2" color="#05CD99" />
        <KpiCard title="Em Planejamento" value={campanhas.filter(c => c.status === 'PLANEJAMENTO').length} icon="bi-clipboard-data" color="#FFB547" />
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h5 className="fw-bold m-0">Cronograma Recente</h5>
               <button className="btn btn-light text-primary fw-bold rounded-pill px-4">
                 <i className="bi bi-bar-chart-fill me-2"></i> Relatórios
               </button>
            </div>
            
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th className="text-secondary text-uppercase font-weight-bold text-xxs ps-4">Nome</th>
                    <th className="text-secondary text-uppercase font-weight-bold text-xxs">Canal</th>
                    <th className="text-secondary text-uppercase font-weight-bold text-xxs">Status</th>
                    <th className="text-secondary text-uppercase font-weight-bold text-xxs">Término</th>
                  </tr>
                </thead>
                <tbody>
                  {campanhas.slice(0, 5).map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm fw-bold">{c.nome}</h6>
                            <p className="text-xs text-muted mb-0">{c.objetivo}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0 text-dark">{c.canalNome}</p>
                      </td>
                      <td className="align-middle text-sm">
                        <span className={`badge ${c.status === 'ATIVA' ? 'bg-success-subtle' : 'bg-secondary-subtle'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="align-middle">
                        <span className="text-secondary text-xs font-weight-bold">
                          {new Date(c.dataFim).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
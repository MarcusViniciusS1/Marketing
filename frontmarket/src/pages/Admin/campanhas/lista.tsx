import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { buscarCampanhas, deletarCampanha, type Campanha } from "../../../services/campanhaService";
import type { RootState } from "../../../redux/store";

export default function ListaCampanhas() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica se é Admin para mostrar a coluna extra
  const userRole = useSelector((state: RootState) => state.auth.usuario?.role);
  const isSuperAdmin = userRole === 'ADMIN';

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await buscarCampanhas();
      setCampanhas(dados);
    } catch (error) {
      console.error("Erro ao carregar campanhas");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir esta campanha?")) {
      await deletarCampanha(id);
      carregar();
    }
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Gerenciar Campanhas</h3>
          <p className="text-muted mb-0">Acompanhe o desempenho e status das ações de marketing.</p>
        </div>
        <Link to="/campanhas/nova" className="btn btn-primary shadow-sm px-4 py-2">
          <i className="bi bi-plus-lg me-2"></i> Nova Campanha
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4 py-3">Nome</th>
                  <th>Canal</th>
                  <th>Orçamento</th>
                  <th>Período</th>
                  {/* COLUNA EXTRA PARA ADMIN */}
                  {isSuperAdmin && <th>Empresa</th>}
                  <th>Status</th>
                  <th className="text-end pe-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan={isSuperAdmin ? 7 : 6} className="text-center py-5 text-muted">Carregando...</td></tr>
                ) : campanhas.map((c) => (
                <tr key={c.id}>
                  <td className="ps-4 fw-semibold">{c.nome}</td>
                  <td><span className="badge bg-info text-dark border border-info-subtle">{c.canalNome}</span></td>
                  <td>R$ {c.orcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <small className="text-muted d-block">
                      {new Date(c.dataInicio).toLocaleDateString('pt-BR')} até
                    </small>
                    <small className="text-muted">
                      {new Date(c.dataFim).toLocaleDateString('pt-BR')}
                    </small>
                  </td>
                  
                  {/* DADO DA EMPRESA (Visível só para Admin) */}
                  {isSuperAdmin && (
                      <td>
                          <span className="fw-bold text-dark">{c.empresaNome || `ID: ${c.empresaId}`}</span>
                      </td>
                  )}

                  <td>
                    <span className={`badge rounded-pill px-3 py-2 bg-${c.status === 'ATIVA' ? 'success' : c.status === 'CONCLUIDA' ? 'dark' : 'secondary'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                        <Link to={`/campanhas/${c.id}/editar`} className="btn btn-sm btn-outline-secondary px-3">
                        Editar
                        </Link>
                        <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-outline-danger px-3">
                        Excluir
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
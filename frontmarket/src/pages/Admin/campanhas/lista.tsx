import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarCampanhas, deletarCampanha, type Campanha } from "../../../services/campanhaService";

export default function ListaCampanhas() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await buscarCampanhas();
      setCampanhas(dados);
    } catch (error) {
      console.error("Erro ao carregar campanhas");
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
        <h3 className="fw-bold">Gerenciar Campanhas</h3>
        <Link to="/campanhas/nova" className="btn btn-primary shadow-sm">
          <i className="bi bi-plus-lg me-2"></i>Nova Campanha
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Nome</th>
                <th>Canal</th>
                <th>Orçamento</th>
                <th>Período</th>
                <th>Status</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map((c) => (
                <tr key={c.id}>
                  <td className="ps-4 fw-semibold">{c.nome}</td>
                  <td><span className="badge bg-info text-dark">{c.canalNome}</span></td>
                  <td>R$ {c.orcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <small className="text-muted">
                      {new Date(c.dataInicio).toLocaleDateString('pt-BR')} - {new Date(c.dataFim).toLocaleDateString('pt-BR')}
                    </small>
                  </td>
                  <td>
                    <span className={`badge bg-${c.status === 'ATIVA' ? 'success' : c.status === 'CONCLUIDA' ? 'dark' : 'secondary'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <Link to={`/campanhas/${c.id}/editar`} className="btn btn-sm btn-outline-secondary me-2">
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-outline-danger">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
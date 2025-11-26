import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarTodasEmpresas, deletarEmpresa, type Empresa } from "../../../services/empresaService";

export default function ListaEmpresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await buscarTodasEmpresas();
      setEmpresas(dados);
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("ATENÇÃO: Excluir uma empresa removerá também todos os seus usuários e campanhas. Deseja continuar?")) {
      try {
        await deletarEmpresa(id);
        alert("Empresa excluída com sucesso!");
        carregar();
      } catch (error) {
        alert("Erro ao excluir empresa.");
      }
    }
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Gestão de Empresas</h3>
          <p className="text-muted mb-0">Administração de todos os tenants da plataforma.</p>
        </div>
        <Link to="/empresa/nova" className="btn btn-primary shadow-sm d-flex align-items-center">
          <i className="bi bi-plus-lg me-2"></i> Nova Empresa
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4 py-3">Empresa</th>
                  <th>CNPJ</th>
                  <th>Setor</th>
                  <th>Contato</th>
                  <th className="text-end pe-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-5">Carregando...</td></tr>
                ) : empresas.length > 0 ? (
                  empresas.map((e) => (
                    <tr key={e.id}>
                      <td className="ps-4 fw-semibold text-dark">{e.nomeFantasia}</td>
                      <td>{e.cnpj}</td>
                      <td><span className="badge bg-light text-dark border">{e.setor}</span></td>
                      <td>
                        <div className="d-flex flex-column small">
                          <span>{e.email}</span>
                          <span className="text-muted">{e.telefone}</span>
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        <Link to={`/empresa/${e.id}/editar`} className="btn btn-sm btn-outline-secondary me-2" title="Editar">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button onClick={() => handleDelete(e.id)} className="btn btn-sm btn-outline-danger" title="Excluir">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="text-center py-5 text-muted">Nenhuma empresa cadastrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
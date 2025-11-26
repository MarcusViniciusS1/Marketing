import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buscarUsuariosDaEmpresa, type Usuario } from "../../../services/usuarioService";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarUsuariosDaEmpresa();
        setUsuarios(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Equipe</h3>
          <p className="text-muted mb-0">Usuários vinculados à empresa.</p>
        </div>
        <Link to="/usuarios/novo" className="btn btn-success shadow-sm">
          <i className="bi bi-person-plus-fill me-2"></i> Adicionar Membro
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4 py-3">Nome</th>
                <th>Email</th>
                <th>Perfil</th>
                <th className="text-end pe-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-5">Carregando...</td></tr>
              ) : usuarios.map((u) => (
                <tr key={u.id}>
                  <td className="ps-4 fw-semibold">{u.nome}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-secondary">{u.role}</span></td>
                  <td className="text-end pe-4"><span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">Ativo</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
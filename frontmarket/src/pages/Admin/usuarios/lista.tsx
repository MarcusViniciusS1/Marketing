import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buscarUsuariosDaEmpresa, deletarUsuario, type Usuario } from "../../../services/usuarioService";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarEquipe();
  }, []);

  async function carregarEquipe() {
    try {
      const dados = await buscarUsuariosDaEmpresa();
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar equipe:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja remover este usuário da equipe?")) {
      try {
        await deletarUsuario(id);
        alert("Usuário removido com sucesso!");
        carregarEquipe();
      } catch (error) {
        alert("Erro ao excluir usuário.");
      }
    }
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Equipe da Empresa</h3>
          <p className="text-muted mb-0">Gerencie os membros que têm acesso à plataforma.</p>
        </div>
        <Link to="/usuarios/novo" className="btn btn-success shadow-sm d-flex align-items-center px-4 py-2">
          <i className="bi bi-person-plus-fill me-2"></i> Adicionar Membro
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4 py-3">Nome Completo</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-5 text-muted">Carregando equipe...</td></tr>
                ) : usuarios.length > 0 ? (
                  usuarios.map((u) => (
                    <tr key={u.id}>
                      <td className="ps-4 fw-bold text-dark">{u.nome}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${u.role === 'ADMINONG' ? 'bg-primary' : 'bg-secondary'}`}>
                          {u.role === 'ADMINONG' ? 'Gerente' : 'Funcionário'}
                        </span>
                      </td>
                      <td><span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">Ativo</span></td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          {/* BOTÃO EDITAR: CINZA (SECONDARY) */}
                          <button 
                            onClick={() => navigate(`/usuarios/${u.id}/editar`)} 
                            className="btn btn-sm btn-outline-secondary px-3"
                          >
                            Editar
                          </button>
                          
                          {/* BOTÃO EXCLUIR: VERMELHO (DANGER) */}
                          <button 
                            onClick={() => handleDelete(u.id)} 
                            className="btn btn-sm btn-outline-danger px-3"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="text-center py-5 text-muted">Nenhum membro encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
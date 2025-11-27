import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarUsuario, buscarUsuarioLogado, buscarUsuarioPorId, type UsuarioRequest } from "../../../services/usuarioService";
import { buscarTodasEmpresas } from "../../../services/empresaService";

export default function FormularioUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  
  // Listas para selects
  const [empresas, setEmpresas] = useState<{id: number, nomeFantasia: string}[]>([]);

  const [form, setForm] = useState<UsuarioRequest>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    role: "USER",
    empresaId: undefined
  });

  useEffect(() => {
    carregarDadosIniciais();
  }, [id]);

  async function carregarDadosIniciais() {
    try {
      // 1. Carregar lista de empresas para o select
      const listaEmpresas = await buscarTodasEmpresas();
      setEmpresas(listaEmpresas);

      if (id) {
        // MODO EDIÇÃO: Carrega usuário existente
        const usuario = await buscarUsuarioPorId(id);
        setForm({
          id: usuario.id,
          nome: usuario.nome,
          cpf: "", // CPF geralmente não volta ou é protegido, verifique backend
          email: usuario.email,
          senha: "", // Não preenche senha na edição
          telefone: usuario.telefone,
          role: usuario.role,
          empresaId: usuario.empresaId
        });
      } else {
        // MODO CRIAÇÃO: Tenta preencher empresa com a do logado por padrão
        const userLogado = await buscarUsuarioLogado();
        if (userLogado.empresaId) {
          setForm(prev => ({ ...prev, empresaId: userLogado.empresaId }));
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await cadastrarUsuario(form); // O mesmo endpoint faz create/update no backend (upsert)
      alert(id ? "Usuário atualizado!" : "Usuário cadastrado!");
      navigate("/usuarios");
    } catch (error: any) {
      const msg = error.response?.data || "Erro ao salvar.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h3 className="fw-bold text-dark mb-0">{id ? "Editar Usuário" : "Novo Membro"}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Completo</label>
              <input type="text" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">CPF</label>
              <input type="text" name="cpf" className="form-control" value={form.cpf} onChange={handleChange} required={!id} placeholder={id ? "Não alterável" : "000.000.000-00"} disabled={!!id} />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">E-mail</label>
              <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone</label>
              <input type="text" name="telefone" className="form-control" value={form.telefone} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Senha {id && "(Deixe vazio para manter)"}</label>
              <input type="password" name="senha" className="form-control" value={form.senha || ""} onChange={handleChange} required={!id} />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Perfil</label>
              <select name="role" className="form-select" value={form.role} onChange={handleChange}>
                <option value="USER">Funcionário</option>
                <option value="ADMINONG">Gerente</option>
                <option value="ADMIN">Super Admin</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Empresa</label>
              <select name="empresaId" className="form-select" value={form.empresaId || ""} onChange={(e) => setForm({...form, empresaId: Number(e.target.value)})}>
                <option value="">Selecione uma empresa...</option>
                {empresas.map(e => (
                  <option key={e.id} value={e.id}>{e.nomeFantasia} ({e.id})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light border" onClick={() => navigate("/usuarios")}>Cancelar</button>
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
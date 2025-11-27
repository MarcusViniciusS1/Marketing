import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  cadastrarUsuario, 
  buscarUsuarioLogado, 
  buscarUsuarioPorId,
  editarUsuario, 
  type UsuarioRequest 
} from "../../../services/usuarioService";
import { buscarTodasEmpresas } from "../../../services/empresaService";

export default function FormularioUsuario() {
  const navigate = useNavigate();
  const { id } = useParams(); // Se tiver ID, é edição
  const [loading, setLoading] = useState(false);
  
  // Estado para a lista de empresas do Select
  const [empresas, setEmpresas] = useState<{id: number, nomeFantasia: string}[]>([]);

  const [form, setForm] = useState<UsuarioRequest>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    role: "USER", // Padrão: Funcionário
    empresaId: undefined
  });

  useEffect(() => {
    carregarDados();
  }, [id]);

  async function carregarDados() {
    try {
      // 1. Carrega as empresas disponíveis para o Select
      try {
          const listaEmpresas = await buscarTodasEmpresas();
          setEmpresas(listaEmpresas);
          
          // Se a lista tiver apenas 1 empresa (caso do Gerente), já seleciona ela automaticamente
          if (listaEmpresas.length === 1 && !id) {
              setForm(prev => ({ ...prev, empresaId: listaEmpresas[0].id }));
          }
      } catch (err) {
          console.log("Não foi possível carregar lista de empresas (pode ser restrição de acesso).");
      }

      if (id) {
        // --- MODO EDIÇÃO ---
        const usuario = await buscarUsuarioPorId(id);
        setForm({
          id: usuario.id,
          nome: usuario.nome,
          cpf: "", // CPF protegido/oculto na edição
          email: usuario.email,
          senha: "", // Senha vazia para não alterar
          telefone: usuario.telefone,
          role: usuario.role,
          empresaId: usuario.empresaId
        });
      } else {
        // --- MODO CRIAÇÃO ---
        // Tenta pegar a empresa do usuário logado como fallback se a lista falhar ou estiver vazia
        if (!form.empresaId) {
            try {
                const userLogado = await buscarUsuarioLogado();
                if (userLogado.empresaId) {
                    setForm(prev => ({ ...prev, empresaId: userLogado.empresaId }));
                }
            } catch (e) { console.error(e); }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Garante que empresaId seja número ou undefined
      const payload = { 
          ...form, 
          empresaId: form.empresaId ? Number(form.empresaId) : undefined 
      };

      if (id) {
        await editarUsuario(payload); // Usa put se for edição
        alert("Usuário atualizado com sucesso!");
      } else {
        await cadastrarUsuario(payload); // Usa post se for novo
        alert("Novo membro cadastrado com sucesso!");
      }
      
      navigate("/usuarios");
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data || "Erro ao salvar usuário. Verifique os dados.";
      // Se o backend retornar objeto de erro, tenta stringify
      alert(typeof msg === 'object' ? JSON.stringify(msg) : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h3 className="fw-bold text-dark mb-0">
            {id ? "Editar Usuário" : "Novo Membro"}
          </h3>
          <button onClick={() => navigate("/usuarios")} className="btn btn-outline-secondary btn-sm">
            Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Completo</label>
              <input 
                type="text" 
                name="nome" 
                className="form-control" 
                value={form.nome} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">CPF</label>
              <input 
                type="text" 
                name="cpf" 
                className="form-control" 
                value={form.cpf} 
                onChange={handleChange} 
                required={!id} 
                placeholder={id ? "Não alterável" : "000.000.000-00"} 
                disabled={!!id} 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">E-mail Corporativo</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone</label>
              <input 
                type="text" 
                name="telefone" 
                className="form-control" 
                value={form.telefone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Senha {id && <span className="text-muted fw-normal">(Deixe vazio para manter)</span>}
              </label>
              <input 
                type="password" 
                name="senha" 
                className="form-control" 
                value={form.senha || ""} 
                onChange={handleChange} 
                required={!id} 
                placeholder="******"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Perfil de Acesso</label>
              <select 
                name="role" 
                className="form-select" 
                value={form.role} 
                onChange={handleChange}
              >
                <option value="USER">Funcionário</option>
                <option value="GERENTE">Gerente</option>
                <option value="ADMIN">Super Admin (Plataforma)</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Empresa Vinculada</label>
              <select 
                name="empresaId" 
                className="form-select" 
                value={form.empresaId || ""} 
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma empresa...</option>
                {empresas.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.nomeFantasia} (ID: {e.id})
                  </option>
                ))}
              </select>
              <div className="form-text">
                O usuário só verá dados desta empresa.
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" className="btn btn-light me-2" onClick={() => navigate("/usuarios")}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Usuário"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
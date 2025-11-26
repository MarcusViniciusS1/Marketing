import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario, buscarUsuarioLogado, type UsuarioRequest } from "../../../services/usuarioService";

export default function FormularioUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState<number | null>(null);

  const [form, setForm] = useState<UsuarioRequest>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    role: "USER", // Padrão para funcionário
    empresaId: undefined
  });

  useEffect(() => {
    // Busca o usuário logado para pegar o ID da empresa e vincular o novo funcionário
    buscarUsuarioLogado().then(user => {
      if (user.empresaId) {
        setEmpresaId(user.empresaId);
        setForm(prev => ({ ...prev, empresaId: user.empresaId }));
      } else {
        alert("Atenção: Você não possui uma empresa vinculada. O usuário será criado sem vínculo.");
        // Não redireciona, permite criar admin sem empresa se necessário
      }
    }).catch(err => console.error("Erro ao buscar sessão:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await cadastrarUsuario(form);
      alert("Usuário cadastrado com sucesso!");
      navigate("/usuarios");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      // Tenta pegar a mensagem de erro enviada pelo Controller do Java
      const mensagemErro = error.response?.data || "Ocorreu um erro desconhecido ao cadastrar.";
      
      // Se a mensagem for um objeto (às vezes o Spring retorna JSON de erro), trata diferente
      if (typeof mensagemErro === 'object') {
         alert("Erro: Verifique os dados. CPF ou E-mail podem já estar em uso.");
      } else {
         alert(`Erro: ${mensagemErro}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h3 className="fw-bold text-dark mb-0">Novo Membro da Equipe</h3>
          {empresaId && <span className="badge bg-light text-dark border">Vinculado à Empresa ID: {empresaId}</span>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Nome */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Completo</label>
              <input 
                type="text" 
                name="nome" 
                className="form-control" 
                value={form.nome} 
                onChange={handleChange} 
                required 
                placeholder="Ex: João Silva"
              />
            </div>

            {/* CPF */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">CPF</label>
              <input 
                type="text" 
                name="cpf" 
                className="form-control" 
                value={form.cpf} 
                onChange={handleChange} 
                required 
                placeholder="000.000.000-00"
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">E-mail Corporativo</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder="joao@empresa.com"
              />
            </div>

            {/* Telefone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone / WhatsApp</label>
              <input 
                type="text" 
                name="telefone" 
                className="form-control" 
                value={form.telefone} 
                onChange={handleChange} 
                required 
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Senha */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Senha de Acesso</label>
              <input 
                type="password" 
                name="senha" 
                className="form-control" 
                value={form.senha || ""} 
                onChange={handleChange} 
                required 
                placeholder="******"
                minLength={6}
              />
            </div>

            {/* Função (Role) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Perfil de Acesso</label>
              <select 
                name="role" 
                className="form-select" 
                value={form.role} 
                onChange={handleChange}
              >
                <option value="USER">Funcionário (Acesso Padrão)</option>
                <option value="ADMINONG">Gerente (Admin da Empresa)</option>
                {/* ADMIN geral não deve ser criado por aqui normalmente */}
              </select>
              <div className="form-text small">Define o nível de permissão no sistema.</div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light border" onClick={() => navigate("/usuarios")}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar Membro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
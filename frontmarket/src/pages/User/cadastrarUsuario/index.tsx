import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cadastrarUsuario, type UsuarioRequest } from "../../../services/usuarioService";
import { buscarTodasEmpresas } from "../../../services/empresaService";

export default function CadastrarUsuario() {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<{id: number, nomeFantasia: string}[]>([]);

  const [formData, setFormData] = useState<UsuarioRequest>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    role: "USER",
    empresaId: undefined
  });

  useEffect(() => {
    // Carrega empresas públicas (devido ao permitAll no backend)
    buscarTodasEmpresas()
      .then(setEmpresas)
      .catch(err => console.log("Não foi possível carregar empresas públicas:", err));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Converte empresaId para numero se selecionado
      const payload = { ...formData, empresaId: formData.empresaId ? Number(formData.empresaId) : undefined };
      await cadastrarUsuario(payload);
      alert("Cadastro realizado! Faça login.");
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data || "Erro ao cadastrar.");
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <h3 className="fw-bold text-info">Criar conta</h3>
        <p className="text-secondary">Preencha os dados para continuar</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-light">Nome</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="form-control bg-dark text-light border-secondary" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">CPF</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="form-control bg-dark text-light border-secondary" placeholder="000.000.000-00" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control bg-dark text-light border-secondary" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Senha</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="form-control bg-dark text-light border-secondary" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="form-control bg-dark text-light border-secondary" required />
        </div>

        {/* SELECT DE EMPRESAS */}
        <div className="mb-3">
          <label className="form-label text-light">Empresa</label>
          <select name="empresaId" className="form-select bg-dark text-light border-secondary" value={formData.empresaId || ""} onChange={handleChange} required>
            <option value="">Selecione sua empresa...</option>
            {empresas.map(e => (
              <option key={e.id} value={e.id}>{e.nomeFantasia}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-info w-100 fw-bold mt-2">
          Cadastrar
        </button>
      </form>
    </>
  );
}
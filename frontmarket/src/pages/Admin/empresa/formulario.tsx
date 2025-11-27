import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  buscarEmpresaPorId, 
  atualizarEmpresaAdmin, 
  salvarEmpresa, 
  type EmpresaRequest 
} from "../../../services/empresaService";

export default function FormularioEmpresaAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<EmpresaRequest>({
    nomeFantasia: "", 
    razaoSocial: "", 
    cnpj: "", 
    email: "", 
    telefone: ""
  });

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    buscarEmpresaPorId(id)
      .then((data: any) => {
        setForm({
          nomeFantasia: data.nomeFantasia,
          razaoSocial: data.razaoSocial || "",
          cnpj: data.cnpj,
          email: data.email,
          telefone: data.telefone
        });
      })
      .catch(err => {
          console.error(err);
          alert("Erro ao carregar dados da empresa.");
          navigate("/empresas");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await atualizarEmpresaAdmin(id, form);
        alert("Empresa atualizada com sucesso!");
      } else {
        await salvarEmpresa(form);
        alert("Empresa cadastrada com sucesso!");
      }
      navigate("/empresas");
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data || "Erro ao salvar. Verifique os dados.";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
      return <div className="text-center p-5">Carregando dados...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3 className="fw-bold text-dark mb-0">{id ? "Editar Empresa" : "Nova Empresa"}</h3>
            <button onClick={() => navigate("/empresas")} className="btn btn-outline-secondary btn-sm">
                Voltar
            </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Fantasia</label>
              <input 
                name="nomeFantasia" 
                className="form-control" 
                value={form.nomeFantasia} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Tech Solutions"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Razão Social</label>
              <input 
                name="razaoSocial" 
                className="form-control" 
                value={form.razaoSocial} 
                onChange={handleChange} 
                placeholder="Ex: Tech Solutions Ltda"
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">CNPJ</label>
              <input 
                name="cnpj" 
                className="form-control" 
                value={form.cnpj} 
                onChange={handleChange} 
                required 
                placeholder="00.000.000/0001-00"
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
                placeholder="contato@empresa.com"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone</label>
              <input 
                name="telefone" 
                className="form-control" 
                value={form.telefone} 
                onChange={handleChange} 
                required 
                placeholder="(00) 0000-0000"
              />
            </div>
            
            <div className="col-12 text-end mt-4 pt-3 border-top">
              <button type="button" className="btn btn-light me-2" onClick={() => navigate("/empresas")}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Dados"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
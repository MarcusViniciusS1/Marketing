import { useEffect, useState } from "react";
import { buscarMinhaEmpresa, atualizarEmpresa, type EmpresaRequest } from "../../../services/empresaService";

export default function MinhaEmpresa() {
  // Estado inicial compatível com a interface EmpresaRequest simplificada
  const [form, setForm] = useState<EmpresaRequest>({
    nomeFantasia: "", 
    razaoSocial: "", 
    cnpj: "", 
    email: "", 
    telefone: ""
  });

  useEffect(() => {
    buscarMinhaEmpresa()
      .then((data: any) => {
        // Mapeia apenas os campos que existem no formulário
        setForm({
          nomeFantasia: data.nomeFantasia,
          razaoSocial: data.razaoSocial || "",
          cnpj: data.cnpj,
          email: data.email,
          telefone: data.telefone
        });
      })
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await atualizarEmpresa(form);
      alert("Dados corporativos atualizados com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar dados.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "900px" }}>
        <h3 className="mb-4 fw-bold border-bottom pb-2 text-dark">Configurações da Empresa</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Nome Fantasia */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Nome Fantasia</label>
              <input 
                name="nomeFantasia" 
                className="form-control" 
                value={form.nomeFantasia} 
                onChange={handleChange} 
                required
              />
            </div>

            {/* Razão Social */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Razão Social</label>
              <input 
                name="razaoSocial" 
                className="form-control" 
                value={form.razaoSocial} 
                onChange={handleChange} 
              />
            </div>

            {/* CNPJ (Desabilitado pois é chave) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">CNPJ</label>
              <input 
                name="cnpj" 
                className="form-control bg-light" 
                value={form.cnpj} 
                disabled 
                title="Não é possível alterar o CNPJ" 
              />
            </div>

            {/* Telefone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Telefone</label>
              <input 
                name="telefone" 
                className="form-control" 
                value={form.telefone} 
                onChange={handleChange} 
                required
              />
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="form-label fw-semibold text-dark">Email Corporativo</label>
              <input 
                name="email" 
                className="form-control" 
                value={form.email} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="col-12 mt-4 text-end">
              <button type="submit" className="btn btn-primary px-4">Salvar Alterações</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
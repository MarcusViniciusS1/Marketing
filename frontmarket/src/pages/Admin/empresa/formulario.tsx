import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarEmpresaPorId, atualizarEmpresaAdmin, salvarEmpresa, type EmpresaRequest } from "../../../services/empresaService";

export default function FormularioEmpresaAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [form, setForm] = useState<EmpresaRequest>({
    nomeFantasia: "", razaoSocial: "", cnpj: "", setor: "", email: "", telefone: "", cidade: "", endereco: ""
  });

  useEffect(() => {
    if (id) {
      buscarEmpresaPorId(id).then((data: any) => {
        setForm({
          nomeFantasia: data.nomeFantasia,
          razaoSocial: data.razaoSocial || "",
          cnpj: data.cnpj,
          setor: data.setor,
          email: data.email,
          telefone: data.telefone,
          cidade: data.cidade || "",
          endereco: data.endereco || ""
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarEmpresaAdmin(id, form);
        alert("Empresa atualizada com sucesso!");
      } else {
        await salvarEmpresa(form);
        alert("Empresa cadastrada com sucesso!");
      }
      navigate("/empresas");
    } catch (error) {
      alert("Erro ao salvar empresa.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3 className="fw-bold mb-0">{id ? "Editar Empresa" : "Nova Empresa"}</h3>
            <button onClick={() => navigate("/empresas")} className="btn btn-outline-secondary">Voltar</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Fantasia</label>
              <input name="nomeFantasia" className="form-control" value={form.nomeFantasia} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Razão Social</label>
              <input name="razaoSocial" className="form-control" value={form.razaoSocial} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">CNPJ</label>
              <input name="cnpj" className="form-control" value={form.cnpj} onChange={handleChange} required placeholder="00.000.000/0000-00" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Setor</label>
              <input name="setor" className="form-control" value={form.setor} onChange={handleChange} placeholder="Ex: Varejo" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">E-mail Corporativo</label>
              <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone</label>
              <input name="telefone" className="form-control" value={form.telefone} onChange={handleChange} />
            </div>
            <div className="col-12 text-end mt-4">
              <button type="submit" className="btn btn-primary px-4">{id ? "Salvar Alterações" : "Cadastrar"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
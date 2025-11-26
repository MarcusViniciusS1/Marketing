import { useEffect, useState } from "react";
import { buscarMinhaEmpresa, atualizarEmpresa, type EmpresaRequest } from "../../../services/empresaService";

export default function MinhaEmpresa() {
  const [form, setForm] = useState<EmpresaRequest>({
    nomeFantasia: "", razaoSocial: "", cnpj: "", setor: "", email: "", telefone: "", cidade: "", endereco: ""
  });

  useEffect(() => {
    buscarMinhaEmpresa().then((data: any) => setForm(data)).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await atualizarEmpresa(form);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "900px" }}>
        <h3 className="mb-4 fw-bold border-bottom pb-2">Dados da Minha Empresa</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nome Fantasia</label>
              <input name="nomeFantasia" className="form-control" value={form.nomeFantasia} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">CNPJ</label>
              <input name="cnpj" className="form-control bg-light" value={form.cnpj} disabled title="Contate o suporte para alterar" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Setor</label>
              <input name="setor" className="form-control" value={form.setor} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Telefone</label>
              <input name="telefone" className="form-control" value={form.telefone} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label fw-semibold">Endereço</label>
              <input name="endereco" className="form-control" value={form.endereco} onChange={handleChange} />
            </div>
            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-success w-100">Salvar Meus Dados</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
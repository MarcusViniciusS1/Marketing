import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarCampanhaPorId, salvarCampanha, type CampanhaRequest } from "../../../services/campanhaService";
import api from "../../../services/api";

export default function FormCampanha() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [canais, setCanais] = useState<{id: number, nome: string}[]>([]);
  
  const [form, setForm] = useState<CampanhaRequest>({
    nome: "",
    objetivo: "",
    orcamento: 0,
    dataInicio: "",
    dataFim: "",
    canalId: 0
  });

  useEffect(() => {
    // Busca lista de canais (Google, Facebook, etc)
    api.get("/canais").then(res => setCanais(res.data));

    if (id) {
      buscarCampanhaPorId(id).then(data => {
        setForm({
          nome: data.nome,
          objetivo: data.objetivo,
          orcamento: data.orcamento,
          dataInicio: data.dataInicio,
          dataFim: data.dataFim,
          canalId: 0 // Idealmente o backend deve retornar o ID do canal
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await salvarCampanha(form, id ? Number(id) : undefined);
      alert("Campanha salva com sucesso!");
      navigate("/campanhas");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar campanha.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">
          {id ? "Editar Campanha" : "Nova Campanha"}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nome da Campanha</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} required placeholder="Ex: Lançamento Verão 2025" />
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Orçamento (R$)</label>
              <input type="number" name="orcamento" className="form-control" value={form.orcamento} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Canal de Marketing</label>
              <select name="canalId" className="form-select" value={form.canalId} onChange={handleChange} required>
                <option value={0}>Selecione...</option>
                {canais.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Data Início</label>
              <input type="date" name="dataInicio" className="form-control" value={form.dataInicio} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Data Fim</label>
              <input type="date" name="dataFim" className="form-control" value={form.dataFim} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Objetivo / Descrição</label>
            <textarea name="objetivo" className="form-control" rows={4} value={form.objetivo} onChange={handleChange} required placeholder="Descreva o objetivo principal desta campanha..." />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-light border" onClick={() => navigate("/campanhas")}>Cancelar</button>
            <button type="submit" className="btn btn-primary px-4">Salvar Dados</button>
          </div>
        </form>
      </div>
    </div>
  );
}
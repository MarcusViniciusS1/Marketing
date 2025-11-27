import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarCampanhaPorId, salvarCampanha, type CampanhaRequest } from "../../../services/campanhaService";
import api from "../../../services/api";

export default function FormCampanha() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [canais, setCanais] = useState<{id: number, nome: string}[]>([]);
  
  const [form, setForm] = useState<CampanhaRequest>({
    nome: "",
    objetivo: "",
    orcamento: 0,
    dataInicio: "",
    dataFim: "",
    canalId: 0 // Deve iniciar como número
  });

  useEffect(() => {
    setLoading(true);
    // 1. Carregar canais primeiro
    api.get("/canais")
      .then(res => setCanais(res.data))
      .catch(console.error);

    // 2. Se for edição, carregar dados da campanha
    if (id) {
      buscarCampanhaPorId(id)
        .then(data => {
          setForm({
            nome: data.nome,
            objetivo: data.objetivo,
            orcamento: data.orcamento,
            dataInicio: data.dataInicio,
            dataFim: data.dataFim,
            // IMPORTANTE: O backend precisa retornar o ID do canal, não só o nome.
            // Se o DTO de resposta não tiver canalId, precisamos ajustar no backend (veja passo 2).
            // Por enquanto, assumindo que venha ou que o usuário precise selecionar de novo:
            canalId: (data as any).canalId || 0 
          });
        })
        .catch(() => alert("Erro ao buscar campanha"))
        .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!form.canalId || Number(form.canalId) === 0) {
        alert("Selecione um Canal de Marketing!");
        return;
    }

    setLoading(true);
    try {
      // Converte canalId para número antes de enviar
      const payload = { ...form, canalId: Number(form.canalId) };
      
      await salvarCampanha(payload, id ? Number(id) : undefined);
      alert("Campanha salva com sucesso!");
      navigate("/campanhas");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data || "Erro ao salvar campanha.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-5 text-center">Carregando...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">
          {id ? "Editar Campanha" : "Nova Campanha"}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nome da Campanha</label>
            <input name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Orçamento (R$)</label>
              <input type="number" name="orcamento" className="form-control" value={form.orcamento} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Canal de Marketing</label>
              <select name="canalId" className="form-select" value={form.canalId} onChange={handleChange} required>
                <option value="0">Selecione...</option>
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
            <textarea name="objetivo" className="form-control" rows={4} value={form.objetivo} onChange={handleChange} required />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-light border" onClick={() => navigate("/campanhas")}>Cancelar</button>
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Dados"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
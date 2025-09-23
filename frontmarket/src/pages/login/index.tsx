import { useState } from "react";
import axios from "axios";

type Campaign = {
  id: number;
  name: string;
  status: "Ativa" | "Pausada" | "Finalizada";
  leads: number;
  budget: number;
};

// dados mockados só para exibir tabela inicial
const campaignsMock: Campaign[] = [
  { id: 1, name: "Campanha Natal", status: "Ativa", leads: 500, budget: 1000 },
  { id: 2, name: "Campanha Verão", status: "Pausada", leads: 300, budget: 800 },
  { id: 3, name: "Campanha Lançamento", status: "Ativa", leads: 120, budget: 1500 },
  { id: 4, name: "Campanha Black Friday", status: "Finalizada", leads: 900, budget: 2000 },
];

export default function Campanhas() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignsMock);
  const [showModal, setShowModal] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    status: "Ativa",
    leads: 0,
    budget: 0,
  });

  const API_URL = "http://localhost:8080/campanhas";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({
      ...prev,
      [name]: name === "leads" || name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<Campaign>(API_URL, newCampaign);

      // adiciona no estado local
      setCampaigns((prev) => [...prev, response.data]);

      // fecha modal e reseta formulário
      setShowModal(false);
      setNewCampaign({ name: "", status: "Ativa", leads: 0, budget: 0 });

      alert("Campanha criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar campanha:", error.response?.data || error.message);
      alert("Erro ao criar campanha!");
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Campanhas em Andamento</h1>
          <p className="text-muted">Confira o status e detalhes das campanhas de marketing</p>
        </div>

        {/* Botão que abre modal */}
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Criar Nova Campanha
        </button>
      </div>

      {/* Tabela de campanhas */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Leads</th>
              <th>Orçamento ($)</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp.id} className="text-center">
                <td>{camp.id}</td>
                <td>{camp.name}</td>
                <td>
                  <span
                    className={`fw-bold ${
                      camp.status === "Ativa"
                        ? "text-success"
                        : camp.status === "Pausada"
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    {camp.status}
                  </span>
                </td>
                <td>{camp.leads}</td>
                <td>${camp.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Criar Nova Campanha</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome da Campanha</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newCampaign.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={newCampaign.status}
                      onChange={handleChange}
                    >
                      <option value="Ativa">Ativa</option>
                      <option value="Pausada">Pausada</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Leads</label>
                    <input
                      type="number"
                      className="form-control"
                      name="leads"
                      value={newCampaign.leads}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Orçamento ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="budget"
                      value={newCampaign.budget}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

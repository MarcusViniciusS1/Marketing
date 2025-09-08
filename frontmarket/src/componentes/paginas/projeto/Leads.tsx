import { useState } from "react";

interface Lead {
  id: number;
  nome: string;
  email: string;
  status: "Novo" | "Em Contato" | "Convertido";
}

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, nome: "Maria Silva", email: "maria@email.com", status: "Novo" },
    { id: 2, nome: "João Souza", email: "joao@email.com", status: "Em Contato" },
  ]);

  const [novoLead, setNovoLead] = useState<Partial<Lead>>({});

  const handleAddLead = () => {
    if (!novoLead.nome || !novoLead.email) return;

    const lead: Lead = {
      id: leads.length + 1,
      nome: novoLead.nome,
      email: novoLead.email,
      status: "Novo",
    };
    setLeads([...leads, lead]);
    setNovoLead({});
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">Gerenciamento de Leads</h1>

      {/* Formulário de novo Lead */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">Adicionar Novo Lead</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Nome"
              value={novoLead.nome || ""}
              onChange={(e) => setNovoLead({ ...novoLead, nome: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              placeholder="Email"
              value={novoLead.email || ""}
              onChange={(e) => setNovoLead({ ...novoLead, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md-4 d-grid">
            <button onClick={handleAddLead} className="btn btn-primary">
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Leads */}
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.nome}</td>
              <td>{lead.email}</td>
              <td>
                <span
                  className={`badge ${
                    lead.status === "Convertido"
                      ? "bg-success"
                      : lead.status === "Em Contato"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;

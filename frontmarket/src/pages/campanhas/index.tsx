// src/pages/campanhas/index.tsx

type Campaign = {
  id: number;
  name: string;
  status: "Ativa" | "Pausada" | "Finalizada";
  leads: number;
  budget: number;
};

const campaigns: Campaign[] = [
  { id: 1, name: "Campanha Natal", status: "Ativa", leads: 500, budget: 1000 },
  { id: 2, name: "Campanha Verão", status: "Pausada", leads: 300, budget: 800 },
  { id: 3, name: "Campanha Lançamento", status: "Ativa", leads: 120, budget: 1500 },
  { id: 4, name: "Campanha Black Friday", status: "Finalizada", leads: 900, budget: 2000 },
];

export default function Campanhas() {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Campanhas em Andamento</h1>
        <p className="text-muted">Confira o status e detalhes das campanhas de marketing</p>
      </div>

      {/* Tabela de campanhas */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle bg-white">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Status</th>
              <th scope="col">Leads</th>
              <th scope="col">Orçamento ($)</th>
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
    </div>
  );
}

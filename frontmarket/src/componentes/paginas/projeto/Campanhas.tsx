// src/Campanhas.tsx
import React from "react";



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

function Campanhas() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>Campanhas em Andamento</h1>
        <p>Confira o status e detalhes das campanhas de marketing</p>
      </div>

      {/* Tabela de campanhas */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ background: "#1F2937", color: "#fff" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Nome</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Leads</th>
              <th style={{ padding: "12px" }}>Orçamento ($)</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp.id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{camp.id}</td>
                <td style={{ padding: "10px" }}>{camp.name}</td>
                <td
                  style={{
                    padding: "10px",
                    color:
                      camp.status === "Ativa"
                        ? "green"
                        : camp.status === "Pausada"
                        ? "orange"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {camp.status}
                </td>
                <td style={{ padding: "10px" }}>{camp.leads}</td>
                <td style={{ padding: "10px" }}>{camp.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Campanhas;

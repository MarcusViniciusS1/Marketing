import { useState } from "react";

interface Relatorio {
  id: number;
  data: string; // formato YYYY-MM-DD
  campanha: string;
  leadsGerados: number;
  conversoes: number;
}

function Relatorios() {
  const [filtro, setFiltro] = useState<{ inicio: string; fim: string }>({
    inicio: "",
    fim: "",
  });

  const [relatorios] = useState<Relatorio[]>([
    { id: 1, data: "2025-09-01", campanha: "Campanha A", leadsGerados: 120, conversoes: 18 },
    { id: 2, data: "2025-09-05", campanha: "Campanha B", leadsGerados: 80, conversoes: 9 },
    { id: 3, data: "2025-09-07", campanha: "Campanha C", leadsGerados: 45, conversoes: 5 },
  ]);

  const dadosFiltrados = relatorios.filter((r) => {
    const d = new Date(r.data).getTime();
    const inicio = filtro.inicio ? new Date(filtro.inicio).getTime() : -Infinity;
    const fim = filtro.fim ? new Date(filtro.fim).getTime() : Infinity;
    return d >= inicio && d <= fim;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Relatórios de Marketing</h1>

      {/* Filtros */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">Filtros</h5>
        <div className="row g-2">
          <div className="col-md-5">
            <label className="form-label">Data Inicial</label>
            <input
              type="date"
              className="form-control"
              value={filtro.inicio}
              onChange={(e) => setFiltro({ ...filtro, inicio: e.target.value })}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Data Final</label>
            <input
              type="date"
              className="form-control"
              value={filtro.fim}
              onChange={(e) => setFiltro({ ...filtro, fim: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Tabela de Relatórios */}
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Campanha</th>
            <th>Leads Gerados</th>
            <th>Conversões</th>
            <th>Taxa Conversão</th>
          </tr>
        </thead>
        <tbody>
          {dadosFiltrados.map((rel) => {
            const taxa = ((rel.conversoes / rel.leadsGerados) * 100).toFixed(1);
            return (
              <tr key={rel.id}>
                <td>{rel.id}</td>
                <td>{rel.data}</td>
                <td>{rel.campanha}</td>
                <td>{rel.leadsGerados}</td>
                <td>{rel.conversoes}</td>
                <td>{taxa}%</td>
              </tr>
            );
          })}
          {dadosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                Nenhum relatório encontrado para o período selecionado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Relatorios;
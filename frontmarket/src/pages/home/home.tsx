import React from 'react';

interface Metric {
  title: string;
  value: number;
  change: number;
  unit: string;
}

const metrics: Metric[] = [
  { title: "Leads", value: 1200, change: 12, unit: '' },
  { title: "Campanhas Ativas", value: 8, change: -5, unit: '' },
  { title: "Conversões", value: 350, change: 20, unit: '' },
  { title: "ROI", value: 15000, change: 8, unit: 'R$' },
];

const Home: React.FC = () => {
  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="mb-5 text-center">
        <h1 className="display-4 fw-bold text-dark">Dashboard de Marketing</h1>
        <p className="lead text-muted">Visão geral das principais métricas de desempenho.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {metrics.map((metric, index) => {
          const isPositive = metric.change >= 0;
          const colorClass = isPositive ? "text-success" : "text-danger";
          const arrow = isPositive ? "▲" : "▼";
          
          return (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase mb-3">{metric.title}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="h2 mb-0 fw-bold">
                      {metric.unit} {metric.value.toLocaleString('pt-BR')}
                    </p>
                    <p className={`mb-0 fw-semibold ${colorClass}`}>
                      {arrow} {Math.abs(metric.change)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

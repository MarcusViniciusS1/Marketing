

type Metric = {
  title: string;
  value: number;
  change: number;
};

const metrics: Metric[] = [
  { title: "Leads", value: 1200, change: 12 },
  { title: "Campanhas Ativas", value: 8, change: 5 },
  { title: "Conversões", value: 350, change: 20 },
  { title: "ROI", value: 15000, change: 8 },
];

function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>Dashboard</h1>
        <p>Visão geral das métricas de marketing</p>
      </div>

      {/* Cards de métricas */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {metrics.map((metric) => (
          <div
            key={metric.title}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              flex: "1 1 200px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{metric.title}</h3>
            <p style={{ fontSize: "24px", marginBottom: "5px" }}>{metric.value}</p>
            <p style={{ color: metric.change >= 0 ? "green" : "red" }}>
              {metric.change >= 0 ? "▲" : "▼"} {metric.change}%
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
  
}
// react.ts
// Boodstrap
// axios
// Proibido local storage
// Troca de template na rota
// Dois tamplates usando outlet 
// Menu hamburger dimencionar com tag do outlet
// Vai ser cobrado o uso de componentes
// Sem CSS somente com bootstrap
// 
// 

export default Home;

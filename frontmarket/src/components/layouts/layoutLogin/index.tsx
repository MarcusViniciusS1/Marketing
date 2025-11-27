import { Outlet } from "react-router-dom";

export default function LayoutLogin(){
     return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ 
        // Fundo gradiente "Aurora" moderno
        background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Elementos decorativos de fundo (Orbs) */}
      <div style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
          background: '#6366f1', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.4, zIndex: 0
      }}></div>
      <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px',
          background: '#a855f7', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, zIndex: 0
      }}></div>

      <div
        className="card border-0 p-5 fade-in"
        style={{ 
          maxWidth: "450px", 
          width: "90%", 
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.85)", // Mais opaco para legibilidade
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
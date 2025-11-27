import { Outlet } from "react-router-dom";

export default function LayoutLogin(){
     return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ 
        background: "linear-gradient(135deg, #F4F7FE 0%, #E6E6FF 100%)", // Fundo Off-white/Indigo suave
        backgroundSize: "cover"
      }}
    >
      <div
        className="card border-0 p-5"
        style={{ 
          maxWidth: "480px", 
          width: "90%", 
          borderRadius: "30px", // Bordas bem arredondadas
          boxShadow: "0px 20px 50px rgba(67, 24, 255, 0.1)", // Sombra colorida suave
          backgroundColor: "#ffffff"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
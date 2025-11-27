import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar";
import Header from "../../header";
// Footer removido do layout fixo para dar mais limpeza, ou pode manter se quiser.

export default function LayoutMain() {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Área de Conteúdo */}
      <div className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: "#F4F7FE" }}>
        <Header />
        
        {/* Container com scroll interno */}
        <div className="flex-grow-1 p-4 overflow-auto">
          <div className="container-fluid" style={{ maxWidth: "1400px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
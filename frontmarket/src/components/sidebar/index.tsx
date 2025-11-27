import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => 
    location.pathname.startsWith(path) ? "active" : "";

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const width = isCollapsed ? "80px" : "280px";

  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-white" 
      style={{ 
        width: width, 
        height: "100vh", 
        backgroundColor: "#111C44", // Cor corporativa escura
        transition: "width 0.3s ease",
        overflow: "hidden",
        whiteSpace: "nowrap",
        zIndex: 1000,
        boxShadow: "4px 0 20px rgba(0,0,0,0.05)"
      }}
    >
      {/* Header Sidebar */}
      <div className="d-flex align-items-center justify-content-between mb-5 mt-2 ps-2">
        {!isCollapsed && (
          <div className="d-flex align-items-center">
             <div className="bg-white rounded-3 d-flex align-items-center justify-content-center me-2" style={{width: 40, height: 40}}>
                <span className="fs-4">🚀</span>
             </div>
             <span className="fw-bold fs-5 letter-spacing-1">MKT<span style={{color: '#6AD2FF'}}>PRO</span></span>
          </div>
        )}
        <button onClick={toggleSidebar} className="btn btn-link text-white-50 p-0 ms-auto">
          <i className={`bi ${isCollapsed ? 'bi-list' : 'bi-chevron-left'} fs-4`}></i>
        </button>
      </div>

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link d-flex align-items-center py-3 ${isActive('/dashboard')} ${isCollapsed ? 'justify-content-center' : 'px-3'}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            {!isCollapsed && <span className="ms-3 fw-medium">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/campanhas" className={`nav-link d-flex align-items-center py-3 ${isActive('/campanhas')} ${isCollapsed ? 'justify-content-center' : 'px-3'}`}>
            <i className="bi bi-megaphone-fill fs-5"></i>
            {!isCollapsed && <span className="ms-3 fw-medium">Campanhas</span>}
          </Link>
        </li>
        <li>
          <Link to="/empresas" className={`nav-link d-flex align-items-center py-3 ${isActive('/empresas')} ${isCollapsed ? 'justify-content-center' : 'px-3'}`}>
            <i className="bi bi-building-fill fs-5"></i>
            {!isCollapsed && <span className="ms-3 fw-medium">Empresa</span>}
          </Link>
        </li>
        <li>
          <Link to="/usuarios" className={`nav-link d-flex align-items-center py-3 ${isActive('/usuarios')} ${isCollapsed ? 'justify-content-center' : 'px-3'}`}>
            <i className="bi bi-people-fill fs-5"></i>
            {!isCollapsed && <span className="ms-3 fw-medium">Equipe</span>}
          </Link>
        </li>
      </ul>

      {/* Admin Footer */}
      {!isCollapsed && (
        <div className="mt-auto mb-3 px-3">
            <div className="p-3 rounded-4" style={{background: 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}}>
                <small className="text-white-50 d-block mb-1">Logado como</small>
                <div className="fw-bold">Admin</div>
            </div>
        </div>
      )}

      <button onClick={handleLogout} className={`btn btn-link text-danger text-decoration-none d-flex align-items-center mt-2 ${isCollapsed ? 'justify-content-center' : 'px-3'}`}>
        <i className="bi bi-box-arrow-left fs-5"></i>
        {!isCollapsed && <span className="ms-3 fw-medium">Sair</span>}
      </button>
    </div>
  );
}
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useState } from "react";
import type { RootState } from "../../redux/store"; // Ajuste o import conforme sua estrutura

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Pegar role do usuário para mostrar menu de Admin (Opcional)
  // const role = useSelector((state: RootState) => state.auth.usuario?.role); 
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => 
    location.pathname.startsWith(path) 
      ? "bg-primary text-white fw-bold shadow-sm" 
      : "text-white-50 hover-white";

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Largura dinâmica
  const width = isCollapsed ? "80px" : "260px";

  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" 
      style={{ 
        width: width, 
        minHeight: "100vh", 
        transition: "width 0.3s ease-in-out",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderRight: "1px solid #333"
      }}
    >
      {/* --- CABEÇALHO DO MENU --- */}
      <div className="d-flex flex-column mb-4">
        
        {/* Botão Sanduíche (Alinhado à direita ou centro se fechado) */}
        <div className={`d-flex w-100 ${isCollapsed ? 'justify-content-center' : 'justify-content-end'}`}>
          <button 
            onClick={toggleSidebar} 
            className="btn btn-link text-white p-0 text-decoration-none"
            title={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            <i className="bi bi-list fs-3"></i>
          </button>
        </div>

        {/* Logo Centralizada (Apenas ícone se fechado, ou ajustada) */}
        <div className="d-flex justify-content-center mt-2" style={{ minHeight: "60px", alignItems: "center" }}>
           <img 
            src="/img/logo.png" 
            alt="Logo" 
            style={{ 
                width: isCollapsed ? "40px" : "90px", 
                height: "auto",
                objectFit: "contain",
                transition: "all 0.3s ease"
            }} 
          />
        </div>
      </div>

      <hr className="border-secondary" />

      {/* --- LISTA DE NAVEGAÇÃO --- */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        
        {/* Dashboard */}
        <li className="nav-item">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
            title="Dashboard"
          >
            <span className="fs-5">📊</span>
            {!isCollapsed && <span className="ms-3">Dashboard</span>}
          </Link>
        </li>

        {/* Campanhas */}
        <li>
          <Link 
            to="/campanhas" 
            className={`nav-link ${isActive('/campanhas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
            title="Campanhas"
          >
            <span className="fs-5">📢</span>
            {!isCollapsed && <span className="ms-3">Campanhas</span>}
          </Link>
        </li>

        {/* Minha Empresa (Perfil) */}
        <li>
          <Link 
            to="/empresa" 
            className={`nav-link ${isActive('/empresa')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
            title="Minha Empresa"
          >
            <span className="fs-5">🏢</span>
            {!isCollapsed && <span className="ms-3">Minha Empresa</span>}
          </Link>
        </li>

        {/* Equipe */}
        <li>
          <Link 
            to="/usuarios" 
            className={`nav-link ${isActive('/usuarios')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
            title="Equipe"
          >
            <span className="fs-5">👥</span>
            {!isCollapsed && <span className="ms-3">Equipe</span>}
          </Link>
        </li>

        {/* --- ÁREA ADMINISTRATIVA (Ex: Só aparece para Admins) --- */}
        {/* Você pode envolver isso numa verificação: if (role === 'ADMIN') { ... } */}
        
        {!isCollapsed && <div className="text-uppercase text-white-50 mt-3 mb-2 small fw-bold ps-3" style={{fontSize: "0.75rem"}}>Administração</div>}
        
        <li>
          <Link 
            to="/empresas" 
            className={`nav-link ${isActive('/empresas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
            title="Todas as Empresas"
          >
            <span className="fs-5">🌎</span>
            {!isCollapsed && <span className="ms-3">Todas Empresas</span>}
          </Link>
        </li>

      </ul>

      <hr className="border-secondary" />

      {/* --- LOGOUT --- */}
      <button 
        onClick={handleLogout} 
        className={`btn btn-outline-danger w-100 mt-auto d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
        title="Sair"
      >
        <span className="fs-5">🚪</span>
        {!isCollapsed && <span className="ms-2">Sair</span>}
      </button>
    </div>
  );
}
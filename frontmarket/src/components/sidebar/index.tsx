import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useState } from "react";
import type { RootState } from "../../redux/store";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const user = useSelector((state: RootState) => state.auth.usuario);
  const userRole = user?.role;
  const empresaId = user?.empresaId ? Number(user.empresaId) : null;

  const isSuperAdmin = userRole === 'ADMIN' || empresaId === 1;

  // --- CORREÇÃO DE CONTRASTE AQUI ---
  // Quando ativo: Fundo branco sólido e texto na cor primária (Indigo)
  const isActive = (path: string) => 
    location.pathname.startsWith(path) 
      ? "bg-white text-primary fw-bold shadow-sm border border-white" 
      : "text-white text-opacity-75 hover-white";

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const width = isCollapsed ? "80px" : "260px";

  const getRoleLabel = () => {
    if (isSuperAdmin) return '👑 Super Admin';
    if (userRole === 'GERENTE' || userRole === 'ADMINONG') return '💼 Gerente';
    return '🛠️ Funcionário';
  };

  return (
    <div 
      className="d-flex flex-column flex-shrink-0 p-3 text-white shadow-lg" 
      style={{ 
        width: width, 
        minHeight: "100vh", 
        transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)", 
        // Gradiente moderno
        background: "linear-gradient(195deg, #42424a, #191919)", 
        borderRight: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden", 
        whiteSpace: "nowrap" 
      }}
    >
      {/* --- CABEÇALHO --- */}
      <div className="d-flex flex-column mb-4">
        <div className={`d-flex w-100 align-items-center ${isCollapsed ? 'justify-content-center' : 'justify-content-between'}`}>
          
          {!isCollapsed && (
             <div className="d-flex align-items-center gap-2 fade-in">
                <span className="fs-3">🚀</span>
                <div className="d-flex flex-column">
                    {/* --- NOME ALTERADO AQUI --- */}
                    <span className="fw-bold fs-5" style={{letterSpacing: '1px'}}>MKTPro</span>
                    <span style={{fontSize: '0.65rem', opacity: 0.7}}>MENU</span>
                </div>
             </div>
          )}

          <button onClick={toggleSidebar} className="btn btn-link text-white p-0" style={{opacity: 0.8}}>
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>
      </div>

      <hr className="border-light opacity-25 my-2" />

      {/* --- MENU COM EMOJIS --- */}
      <ul className="nav nav-pills flex-column mb-auto gap-2 mt-3">
        
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{borderRadius: '12px', transition: 'all 0.2s'}}>
            <span className="fs-5">📊</span>
            {!isCollapsed && <span className="ms-3">Dashboard</span>}
          </Link>
        </li>

        {isSuperAdmin ? (
          <li>
            <Link to="/empresas" className={`nav-link ${isActive('/empresas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{borderRadius: '12px', transition: 'all 0.2s'}}>
              <span className="fs-5">🏢</span>
              {!isCollapsed && <span className="ms-3">Empresas</span>}
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/empresa" className={`nav-link ${isActive('/empresa')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{borderRadius: '12px', transition: 'all 0.2s'}}>
              <span className="fs-5">🏢</span>
              {!isCollapsed && <span className="ms-3">Minha Empresa</span>}
            </Link>
          </li>
        )}

        <li>
          <Link to="/campanhas" className={`nav-link ${isActive('/campanhas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{borderRadius: '12px', transition: 'all 0.2s'}}>
            <span className="fs-5">📢</span>
            {!isCollapsed && <span className="ms-3">Campanhas</span>}
          </Link>
        </li>

        <li>
          <Link to="/usuarios" className={`nav-link ${isActive('/usuarios')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} style={{borderRadius: '12px', transition: 'all 0.2s'}}>
            <span className="fs-5">👥</span>
            {!isCollapsed && <span className="ms-3">Equipe</span>}
          </Link>
        </li>
      </ul>

      {/* --- RODAPÉ & BOTÃO SAIR --- */}
      <div className="mt-auto">
        {!isCollapsed && (
            <div className="p-3 rounded-3 mb-3 bg-black bg-opacity-25 border border-white border-opacity-10">
                <small className="text-white-50 d-block mb-1" style={{fontSize: '0.65rem'}}>CONECTADO COMO</small>
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 30, height: 30, fontSize: '0.8rem'}}>
                        {user?.nome?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <div className="fw-bold text-truncate" style={{fontSize: '0.9rem'}}>{user?.nome}</div>
                        <div className="text-white-50" style={{fontSize: '0.7rem'}}>{getRoleLabel()}</div>
                    </div>
                </div>
            </div>
        )}

        <button 
            onClick={handleLogout} 
            className={`btn w-100 d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'justify-content-start px-3'}`}
            style={{
                backgroundColor: 'rgba(220, 53, 69, 0.15)', // Fundo vermelho suave
                color: '#ff878d', // Texto vermelho claro
                border: '1px solid rgba(220, 53, 69, 0.3)',
                borderRadius: '12px',
                height: '45px',
                transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.15)'}
        >
            <span className="fs-5">🚪</span>
            {!isCollapsed && <span className="ms-3 fw-bold">Sair</span>}
        </button>
      </div>
    </div>
  );
}
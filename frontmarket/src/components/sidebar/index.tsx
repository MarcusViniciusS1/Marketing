import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useState, useEffect } from "react";
import type { RootState } from "../../redux/store";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Pega dados do Redux
  const user = useSelector((state: RootState) => state.auth.usuario);
  const userRole = user?.role;
  const empresaId = user?.empresaId ? Number(user.empresaId) : null;

  // Debug: Veja no console o que está chegando
  useEffect(() => {
    console.log("Sidebar Debug:", { userRole, empresaId });
  }, [userRole, empresaId]);

  // --- LÓGICA DE PERMISSÕES ---
  // Regra: É Super Admin se tiver role 'ADMIN' OU se pertencer à Empresa 1
  const isSuperAdmin = userRole === 'ADMIN' || empresaId === 1;
  
  const isGerente = (userRole === 'GERENTE' || userRole === 'ADMINONG') && !isSuperAdmin;
  const isFuncionario = !isSuperAdmin && !isGerente;

  const isActive = (path: string) => 
    location.pathname.startsWith(path) ? "bg-primary text-white fw-bold shadow-sm" : "text-white-50 hover-white";

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const width = isCollapsed ? "80px" : "260px";

  // Texto do Rodapé
  const getRoleLabel = () => {
    if (isSuperAdmin) return 'Super Admin';
    if (isGerente) return 'Gerente';
    return 'Funcionário';
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: width, minHeight: "100vh", transition: "width 0.3s ease", overflow: "hidden", whiteSpace: "nowrap" }}>
      {/* Header */}
      <div className="d-flex flex-column mb-4">
        <div className={`d-flex w-100 ${isCollapsed ? 'justify-content-center' : 'justify-content-end'}`}>
          <button onClick={toggleSidebar} className="btn btn-link text-white p-0"><i className="bi bi-list fs-3"></i></button>
        </div>
        <div className="d-flex justify-content-center mt-2">
           <img src="/img/logo.png" alt="Logo" style={{ width: isCollapsed ? "40px" : "90px", transition: "all 0.3s ease" }} />
        </div>
      </div>
      <hr className="border-secondary" />

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} title="Dashboard">
            <span className="fs-5">📊</span>{!isCollapsed && <span className="ms-3">Dashboard</span>}
          </Link>
        </li>

        {/* Menu de Empresas: Só Super Admin vê a lista completa */}
        {isSuperAdmin ? (
          <li>
            <Link to="/empresas" className={`nav-link ${isActive('/empresas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} title="Todas Empresas">
              <span className="fs-5">🌎</span>{!isCollapsed && <span className="ms-3">Todas Empresas</span>}
            </Link>
          </li>
        ) : (
          // Gerente/Funcionário vê apenas "Minha Empresa"
          <li>
            <Link to="/empresa" className={`nav-link ${isActive('/empresa')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} title="Minha Empresa">
              <span className="fs-5">🏢</span>{!isCollapsed && <span className="ms-3">Minha Empresa</span>}
            </Link>
          </li>
        )}

        <li>
          <Link to="/campanhas" className={`nav-link ${isActive('/campanhas')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} title="Campanhas">
            <span className="fs-5">📢</span>{!isCollapsed && <span className="ms-3">Campanhas</span>}
          </Link>
        </li>

        <li>
          <Link to="/usuarios" className={`nav-link ${isActive('/usuarios')} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`} title="Equipe">
            <span className="fs-5">👥</span>{!isCollapsed && <span className="ms-3">Equipe</span>}
          </Link>
        </li>
      </ul>

      {/* Footer - Status Logado */}
      {!isCollapsed && (
        <div className="mt-auto mb-3 px-3">
            <div className="p-3 rounded-3 bg-secondary bg-opacity-25 border border-secondary">
                <small className="text-white-50 d-block mb-1" style={{fontSize: '0.65rem'}}>LOGADO COMO</small>
                <div className={`fw-bold ${isSuperAdmin ? 'text-warning' : 'text-info'}`}>
                    {getRoleLabel()}
                </div>
            </div>
        </div>
      )}

      <hr className="border-secondary" />
      <button onClick={handleLogout} className={`btn btn-outline-danger w-100 ${isCollapsed ? 'mt-auto' : ''} d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}>
        <span className="fs-5">🚪</span>{!isCollapsed && <span className="ms-2">Sair</span>}
      </button>
    </div>
  );
}
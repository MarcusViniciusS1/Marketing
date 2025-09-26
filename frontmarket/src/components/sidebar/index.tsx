import React from 'react';
import { NavLink } from 'react-router-dom';

// Adicionada a interface de props
interface SidebarProps {
    isOpen: boolean;
    onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <div 
            className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white position-fixed" 
            style={{ 
                width: '280px', 
                minHeight: '100vh', 
                left: isOpen ? '0' : '-280px',
                transition: 'left 0.3s ease-in-out',
                zIndex: 1040
            }}
        >
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Menu Principal</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" end className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Dashboard
                    </NavLink>
                </li>
                 <li>
                    <NavLink to="/registrar-dados" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Registrar Dados
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/consultar-dados" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Consultar Dados
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/empresas/register" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Cadastrar Empresa
                    </NavLink>
                </li>
                 <li>
                    <NavLink to="/consultar-empresas" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Consultar Empresas
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
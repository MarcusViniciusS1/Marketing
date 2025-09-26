import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ width: '280px', minHeight: '100vh' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Menu</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/registrar-dados" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Registrar Dados
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/empresas/register" className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}>
                        Cadastrar Empresa
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

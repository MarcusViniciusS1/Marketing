import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <button className="btn btn-dark" onClick={onToggleSidebar}>
                    ☰
                </button>
                <div className="navbar-brand mx-auto fw-bold text-uppercase">
                    Gerenciamento de Marketing
                </div>
                <ul className="navbar-nav">
                    {user && (
                        <li className="nav-item">
                            <span className="nav-link text-white-50">
                                Olá, {user.nome}!
                            </span>
                        </li>
                    )}
                    <li className="nav-item">
                        <button className="btn btn-danger nav-link px-3" onClick={logout}>
                            Sair
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
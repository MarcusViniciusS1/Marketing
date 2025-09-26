import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Marketing App
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <li className="nav-item">
                                <span className="nav-link text-white-50">
                                    Bem-vindo, {user.nome}!
                                </span>
                            </li>
                        )}
                        <li className="nav-item">
                            <button className="btn btn-danger nav-link" onClick={logout}>
                                Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Caminho da importação corrigido
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login, loading, error } = useAuth();

    // Adicionado tipo de evento
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(email, senha);
    };

    return (
        <div className="text-center">
            <h2 className="mb-4">Acesso ao Painel</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label visually-hidden">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Seu Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label visually-hidden">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        id="senha"
                        placeholder="Sua Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <p className="mt-3">
                Não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/register';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        empresaId: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            empresaId: parseInt(formData.empresaId, 10),
        };

        try {
            if (isNaN(payload.empresaId) || payload.empresaId <= 0) {
                 setError('ID da Empresa inválido. Por favor, preencha o ID da sua empresa.');
                 setLoading(false);
                 return;
            }

            const response = await axios.post(API_URL, payload);
            
            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Usuário cadastrado com sucesso! Redirecionando para o login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "Erro no cadastro. Verifique os dados.";
                setError(errorMessage);
            } else {
                setError("Ocorreu um erro desconhecido.");
            }
            console.error('Erro de Cadastro:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <h2 className="mb-4">Cadastre-se</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" name="senha" placeholder="Senha (mín. 6 caracteres)" value={formData.senha} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control" name="empresaId" placeholder="ID da Sua Empresa (Ex: 1)" value={formData.empresaId} onChange={handleChange} required min="1" />
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                </button>
            </form>

            <p className="mt-3">
                Já tem conta? <Link to="/login">Faça Login</Link>
            </p>
        </div>
    );
};

export default Register;

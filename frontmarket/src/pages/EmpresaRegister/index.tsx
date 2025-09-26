import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = 'http://localhost:8080/api/empresas';

const EmpresaRegister: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const finalValue = name === 'cnpj' ? value.replace(/\D/g, '') : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!token) {
                setError('Acesso negado. Por favor, faça login como Administrador.');
                setLoading(false);
                return;
            }

            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage(`Empresa "${formData.nome}" registrada com sucesso!`);
                setFormData({ nome: '', cnpj: '' });
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "Erro ao registrar empresa. Verifique se o CNPJ é único.";
                setError(errorMessage);
            } else {
                setError("Ocorreu um erro desconhecido.");
            }
            console.error('Erro de Cadastro de Empresa:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Registrar Nova Empresa</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow">
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome da Empresa *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        minLength={3}
                        maxLength={100}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnpj" className="form-label">CNPJ (14 dígitos) *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                        minLength={14}
                        maxLength={14}
                        placeholder="Somente números"
                    />
                </div>

                <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar Empresa'}
                </button>
                <button type="button" className="btn btn-secondary mt-2" onClick={() => navigate('/')} disabled={loading}>
                    Voltar
                </button>
            </form>
        </div>
    );
};

export default EmpresaRegister;

    
    
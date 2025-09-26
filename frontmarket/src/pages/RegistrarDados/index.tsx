import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = 'http://localhost:8080/api/marketing';

const RegistrarDados: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    
    const [formData, setFormData] = useState({
        nomeCampanha: '',
        dataInicio: '',
        dataFim: '',
        custo: 0,
        impressoes: 0,
        clicks: 0,
        conversoes: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Adicionado tipo de evento e conversão de string para número
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseFloat(value) || 0 : value 
        }));
        setError('');
        setSuccessMessage('');
    };

    // Adicionado tipo de evento
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                setSuccessMessage('Dados de marketing registrados com sucesso!');
                setFormData({
                    nomeCampanha: '',
                    dataInicio: '',
                    dataFim: '',
                    custo: 0,
                    impressoes: 0,
                    clicks: 0,
                    conversoes: 0,
                });
            }
        } catch (err) {
            setError("Erro ao registrar os dados. Verifique os campos e tente novamente.");
            console.error('Erro ao registrar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Registrar Dados de Marketing</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow">
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                
                <div className="mb-3">
                    <label htmlFor="nomeCampanha" className="form-label">Nome da Campanha *</label>
                    <input type="text" className="form-control" id="nomeCampanha" name="nomeCampanha" value={formData.nomeCampanha} onChange={handleChange} required />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="dataInicio" className="form-label">Data de Início *</label>
                        <input type="date" className="form-control" id="dataInicio" name="dataInicio" value={formData.dataInicio} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="dataFim" className="form-label">Data de Fim *</label>
                        <input type="date" className="form-control" id="dataFim" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="custo" className="form-label">Custo (R$) *</label>
                        <input type="number" step="0.01" className="form-control" id="custo" name="custo" value={formData.custo} onChange={handleChange} required min="0" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="impressoes" className="form-label">Impressões *</label>
                        <input type="number" className="form-control" id="impressoes" name="impressoes" value={formData.impressoes} onChange={handleChange} required min="0" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="clicks" className="form-label">Cliques *</label>
                        <input type="number" className="form-control" id="clicks" name="clicks" value={formData.clicks} onChange={handleChange} required min="0" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="conversoes" className="form-label">Conversões *</label>
                        <input type="number" className="form-control" id="conversoes" name="conversoes" value={formData.conversoes} onChange={handleChange} required min="0" />
                    </div>
                </div>

                <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar Dados'}
                </button>
            </form>
        </div>
    );
};

export default RegistrarDados;
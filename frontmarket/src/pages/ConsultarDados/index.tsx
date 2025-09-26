import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = 'http://localhost:8080/api/marketing';

interface DadosMarketing {
    id: number;
    nomeCampanha: string;
    dataInicio: string;
    dataFim: string;
    custo: number;
    impressoes: number;
    clicks: number;
    conversoes: number;
}

const ConsultarDados: React.FC = () => {
    const { token } = useAuth();
    const [dados, setDados] = useState<DadosMarketing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [editingDado, setEditingDado] = useState<DadosMarketing | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDados(response.data);
        } catch (err) {
            setError('Falha ao carregar dados de marketing.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja apagar este registro?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchData();
            } catch (err) {
                setError('Erro ao apagar o registro.');
            }
        }
    };
    
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingDado) return;

        try {
            await axios.put(`${API_URL}/${editingDado.id}`, editingDado, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEditingDado(null);
            fetchData();
        } catch (err) {
            setError('Erro ao atualizar o registro.');
        }
    };

    if (loading) return <p>Carregando dados...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Consultar Dados de Marketing</h1>

            {editingDado && (
                <div className="modal show d-block" tabIndex={-1}><div className="modal-dialog modal-lg">
                <div className="modal-content">
                <form onSubmit={handleUpdate}>
                    <div className="modal-header">
                        <h5 className="modal-title">Editando Registro</h5>
                        <button type="button" className="btn-close" onClick={() => setEditingDado(null)}></button>
                    </div>
                    <div className="modal-body">
                         <input type="text" className="form-control mb-2" value={editingDado.nomeCampanha} onChange={(e) => setEditingDado({...editingDado, nomeCampanha: e.target.value})} placeholder="Nome da Campanha" />
                         <input type="date" className="form-control mb-2" value={editingDado.dataInicio} onChange={(e) => setEditingDado({...editingDado, dataInicio: e.target.value})} />
                         <input type="date" className="form-control mb-2" value={editingDado.dataFim} onChange={(e) => setEditingDado({...editingDado, dataFim: e.target.value})} />
                         <input type="number" className="form-control mb-2" value={editingDado.custo} onChange={(e) => setEditingDado({...editingDado, custo: parseFloat(e.target.value)})} placeholder="Custo"/>
                         <input type="number" className="form-control mb-2" value={editingDado.impressoes} onChange={(e) => setEditingDado({...editingDado, impressoes: parseInt(e.target.value)})} placeholder="Impressões"/>
                         <input type="number" className="form-control mb-2" value={editingDado.clicks} onChange={(e) => setEditingDado({...editingDado, clicks: parseInt(e.target.value)})} placeholder="Cliques"/>
                         <input type="number" className="form-control" value={editingDado.conversoes} onChange={(e) => setEditingDado({...editingDado, conversoes: parseInt(e.target.value)})} placeholder="Conversões"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingDado(null)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </form>
                </div></div></div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-hover shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Campanha</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Custo</th>
                            <th>Impressões</th>
                            <th>Cliques</th>
                            <th>Conversões</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.nomeCampanha}</td>
                                <td>{new Date(dado.dataInicio).toLocaleDateString()}</td>
                                <td>{new Date(dado.dataFim).toLocaleDateString()}</td>
                                <td>R$ {dado.custo.toFixed(2)}</td>
                                <td>{dado.impressoes}</td>
                                <td>{dado.clicks}</td>
                                <td>{dado.conversoes}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => setEditingDado(dado)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dado.id)}>Apagar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConsultarDados;
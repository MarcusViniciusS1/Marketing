import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = 'http://localhost:8080/api/empresas';

interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
}

const ConsultarEmpresas: React.FC = () => {
    const { token } = useAuth();
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);

    const fetchEmpresas = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEmpresas(response.data);
        } catch (err) {
            setError('Falha ao carregar empresas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, [token]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja apagar esta empresa?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchEmpresas(); // Recarrega a lista
            } catch (err) {
                setError('Erro ao apagar empresa.');
            }
        }
    };
    
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingEmpresa) return;

        try {
            await axios.put(`${API_URL}/${editingEmpresa.id}`, editingEmpresa, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEditingEmpresa(null);
            fetchEmpresas();
        } catch (err) {
            setError('Erro ao atualizar empresa.');
        }
    };

    if (loading) return <p>Carregando empresas...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Consultar Empresas</h1>

            {editingEmpresa && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleUpdate}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Editando Empresa</h5>
                                    <button type="button" className="btn-close" onClick={() => setEditingEmpresa(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="nome" value={editingEmpresa.nome} onChange={(e) => setEditingEmpresa({...editingEmpresa, nome: e.target.value})} />
                                    </div>
                                     <div className="mb-3">
                                        <label htmlFor="cnpj" className="form-label">CNPJ</label>
                                        <input type="text" className="form-control" id="cnpj" value={editingEmpresa.cnpj} onChange={(e) => setEditingEmpresa({...editingEmpresa, cnpj: e.target.value})} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditingEmpresa(null)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((empresa) => (
                        <tr key={empresa.id}>
                            <td>{empresa.id}</td>
                            <td>{empresa.nome}</td>
                            <td>{empresa.cnpj}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => setEditingEmpresa(empresa)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(empresa.id)}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConsultarEmpresas;
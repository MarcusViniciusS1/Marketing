import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LayoutAdmin from './components/layouts/LayoutAdmin';
import LayoutLogin from './components/layouts/LayoutLogin';

// Importação das páginas da nova estrutura
import Home from './pages/home/home';
import Login from './pages/login';
import Register from './pages/Register';
import EmpresaRegister from './pages/EmpresaRegister';


// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    
    if (loading) {
        return <div className="text-center p-5">Carregando autenticação...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rotas Públicas (Login e Cadastro) */}
                    <Route element={<LayoutLogin />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Rotas Protegidas (Dashboard) */}
                    <Route element={<ProtectedRoute><LayoutAdmin /></ProtectedRoute>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/empresas/register" element={<EmpresaRegister />} />
                    </Route>
                    
                    {/* Redirecionamento de rotas inválidas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;

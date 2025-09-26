import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// --- PONTO DA CORREÇÃO ---
// Adicionadas todas as importações que estavam faltando
import LayoutAdmin from './components/layouts/LayoutAdmin';
import LayoutLogin from './components/layouts/LayoutLogin';
import Home from './pages/home/home';
import Login from './pages/login';
import Register from './pages/Register';
import EmpresaRegister from './pages/EmpresaRegister';
import RegistrarDados from './pages/RegistrarDados';
import ConsultarDados from './pages/ConsultarDados';
import ConsultarEmpresas from './pages/ConsultarEmpresas';
// --- FIM DA CORREÇÃO ---

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rotas Públicas */}
                    <Route element={<LayoutLogin />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Rotas do Sistema */}
                    <Route element={<LayoutAdmin />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/empresas/register" element={<EmpresaRegister />} />
                        <Route path="/consultar-empresas" element={<ConsultarEmpresas />} />
                        <Route path="/registrar-dados" element={<RegistrarDados />} />
                        <Route path="/consultar-dados" element={<ConsultarDados />} />
                    </Route>
                    
                    {/* Redirecionamento padrão */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
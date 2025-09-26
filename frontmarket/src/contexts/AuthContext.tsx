import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Bloco de desenvolvimento para mock (sem alterações)
const authDisabled = import.meta.env.VITE_AUTH_DISABLED === 'true';
const mockUser = {
    nome: 'Usuário Dev',
    email: 'dev@teste.com',
    roles: ['ADMIN', 'USER'],
};

// --- Interfaces de Tipagem ---
interface User {
    nome: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const API_BASE_URL = 'http://localhost:8080/api/auth';
    
    const productionInitialState: AuthState = {
        isLoggedIn: false, token: null, user: null, loading: false, error: null,
    };

    const developmentInitialState: AuthState = {
        isLoggedIn: true, token: 'mock-token-for-dev-mode', user: mockUser, loading: false, error: null,
    };
    
    const [auth, setAuth] = useState<AuthState>(
        authDisabled ? developmentInitialState : productionInitialState
    );

    const navigate = useNavigate();

    const login = async (email: string, senha: string) => {
        setAuth(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, senha });
            
            // --- PONTO DA CORREÇÃO ---
            // Agora, desestruturamos a resposta que contém o token e o objeto 'user'
            const { token, user } = response.data;
            const { nome, email: userEmail, perfil } = user;

            setAuth({
                isLoggedIn: true,
                token: token,
                user: { nome, email: userEmail, roles: [perfil] }, // Armazena o perfil do usuário
                loading: false,
                error: null,
            });
            // --- FIM DA CORREÇÃO ---

            navigate('/');
        } catch (err: unknown) {
            let errorMessage = "Credenciais inválidas ou erro de conexão.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || errorMessage;
            }
            setAuth(prev => ({ 
                ...prev, 
                loading: false, 
                error: errorMessage 
            }));
            console.error('Erro de Login:', err);
        }
    };

    const logout = () => {
        setAuth({
            isLoggedIn: false, token: null, user: null, loading: false, error: null,
        });
        navigate('/login');
    };
    
    const value: AuthContextType = {
        ...auth,
        login: authDisabled ? async () => console.warn('Login desabilitado em modo DEV.') : login,
        logout: authDisabled ? () => console.warn('Logout desabilitado em modo DEV.') : logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
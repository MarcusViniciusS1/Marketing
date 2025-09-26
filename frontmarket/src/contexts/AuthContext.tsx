import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// =====================================================================================
// <--- BLOCO DE DESENVOLVIMENTO: INÍCIO --->
// Tudo dentro deste bloco deve ser apagado para a versão de produção.
// Para ativar, crie um arquivo .env.local na raiz do projeto com: VITE_AUTH_DISABLED=true
// =====================================================================================

// 1. Lê a variável de ambiente do arquivo .env.local
const authDisabled = import.meta.env.VITE_AUTH_DISABLED === 'true';

// 2. Cria um usuário "fake" (mock) para ser usado quando a autenticação estiver desativada.
const mockUser = {
    nome: 'Usuário Dev',
    email: 'dev@teste.com',
    roles: ['ADMIN', 'USER'], // Adicionei roles para corresponder à sua interface User
};

// =====================================================================================
// <--- BLOCO DE DESENVOLVIMENTO: FIM --->
// =====================================================================================


// --- Interfaces de Tipagem (sem alterações) ---
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
    
    // --- Definição dos estados iniciais ---
    const productionInitialState: AuthState = {
        isLoggedIn: false,
        token: null,
        user: null,
        loading: false,
        error: null,
    };

    const developmentInitialState: AuthState = {
        isLoggedIn: true,
        token: 'mock-token-for-dev-mode', // Token falso
        user: mockUser,
        loading: false,
        error: null,
    };

    // =====================================================================================
    // <--- LÓGICA CONDICIONAL 1: INÍCIO --->
    // O estado inicial é definido com base na variável de ambiente.
    // Para reverter, apague esta linha e use apenas a 'productionInitialState'.
    // =====================================================================================
    const [auth, setAuth] = useState<AuthState>(
        authDisabled ? developmentInitialState : productionInitialState
    );
    // =====================================================================================
    // <--- LÓGICA CONDICIONAL 1: FIM --->
    // =====================================================================================

    const navigate = useNavigate();

    // --- Funções de Login e Logout (lógica de produção) ---
    const login = async (email: string, senha: string) => {
        setAuth(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, senha });
            const { token, nome, email: userEmail, roles } = response.data;

            setAuth({
                isLoggedIn: true,
                token: token,
                user: { nome, email: userEmail, roles },
                loading: false,
                error: null,
            });

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
            isLoggedIn: false,
            token: null,
            user: null,
            loading: false,
            error: null,
        });
        navigate('/login');
    };
    
    const value: AuthContextType = {
        ...auth,
        // ==========================================================================
        // <--- LÓGICA CONDICIONAL 2: INÍCIO --->
        // Altere esta parte para voltar ao normal.
        // ==========================================================================
        login: authDisabled ? async () => console.warn('Login desabilitado em modo DEV.') : login,
        logout: authDisabled ? () => console.warn('Logout desabilitado em modo DEV.') : logout,
        // ==========================================================================
        // <--- LÓGICA CONDICIONAL 2: FIM --->
        // ==========================================================================
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
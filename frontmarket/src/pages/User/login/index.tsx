import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucesso } from "../../../redux/authSlice";
import { LoginNovo, type LoginRequest } from "../../../services/authService";
import { jwtDecode } from "jwt-decode"; // Opcional: Se o backend não mandar role no corpo, pode pegar do token

export default function Login() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        senha: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            // 1. Faz o Login
            const response = await LoginNovo(formData);
            const token = response.token;

            if(token) {
                // 2. Monta o objeto do usuário com os dados vindos do Backend
                // IMPORTANTE: O backend precisa retornar 'role' e 'empresaId' (ou 'ongId') no JSON de resposta
                const usuarioLogin = {
                  usuario: { 
                    email: formData.email, 
                    nome: response.nome || "Usuário", // Se o backend mandar nome
                    role: response.role,              // Essencial para o Sidebar
                    empresaId: response.empresaId     // Essencial para identificar Super Admin (ID 1)
                  },
                  token: token
                };
                
                // 3. Salva no Redux
                dispatch(loginSucesso(usuarioLogin));

                // 4. Redireciona
                navigator("/home");
            }
         } catch (error) {
            console.error(error);
            alert("E-mail ou senha inválidos!");
         } finally {
            setLoading(false);
         }
    }

    return (
        <>
            <div className="text-center mb-5">
                <div className="d-inline-flex justify-content-center align-items-center bg-light rounded-circle mb-4 shadow-sm" style={{ width: "90px", height: "90px" }}>
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className="img-fluid"
                        style={{ width: "50px" }}
                    />
                </div>
                
                <h2 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>Bem-vindo de volta!</h2>
                <p className="text-muted">Insira seus dados para acessar o painel.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold text-secondary small ms-1">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0"
                        placeholder="exemplo@email.com"
                        style={{ borderRadius: "12px", fontSize: "0.95rem", padding: "12px 15px" }}
                        required
                    />
                </div>

                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label htmlFor="password" className="form-label fw-semibold text-secondary small ms-1">Senha</label>
                        <Link to="/recuperarSenha" className="small text-primary fw-bold text-decoration-none">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="senha"
                        onChange={handleChange}
                        value={formData.senha}
                        className="form-control form-control-lg bg-light border-0"
                        placeholder="••••••••"
                        style={{ borderRadius: "12px", fontSize: "0.95rem", padding: "12px 15px" }}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mb-4 shadow-sm" 
                    style={{ borderRadius: "12px", fontSize: "1rem", fontWeight: "600" }}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : "Entrar na Plataforma"}
                </button>

                <div className="text-center">
                    <span className="text-muted small">Não tem uma conta? </span>
                    <Link to="/cadastro" className="text-primary fw-bold small text-decoration-none">
                        Criar conta agora
                    </Link>
                </div>
            </form>
        </>
    );
}
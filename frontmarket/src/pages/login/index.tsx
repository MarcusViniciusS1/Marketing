import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
}

function Login() {
  const navigate = useNavigate(); // ✅ corrigido
  const API_URL = "http://localhost:8080/";

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(API_URL + "auth/login", formData);
      const token = response.data.token;

      console.log("Token:", token);
      localStorage.setItem("token", token); // salva token no navegador

      // redireciona para a home (ou dashboard)
      navigate("/home");
    } catch (error: any) {
      console.error("Erro ao logar usuário:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Login</h3>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          className="form-control"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          className="form-control"
          placeholder="Digite sua senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Entrar
      </button>

      <div className="text-center mt-3">
        <span>Não tem conta? </span>
        <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </form>
  );
}

export default Login;

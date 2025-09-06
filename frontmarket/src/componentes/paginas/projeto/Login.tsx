
import React, { useState } from "react";

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de autenticação
    if (usuario === "admin" && senha === "123") {
      alert("Login realizado com sucesso!");
      setErro("");
      // redirecionaria para /campanhas com React Router
    } else {
      setErro("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h1>

        {erro && (
          <p className="mb-4 text-center text-red-500 font-semibold">{erro}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import { registrarNovaSenha } from "../../../services/usuarioService";

export default function ResetarSenha() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registrarNovaSenha({ email, token, senha });
      alert("Senha alterada com sucesso!");
    } catch {
      alert("Erro ao alterar senha.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="text-center mb-3">
        <img
          src="/img/logo.png"
          alt="logo"
          style={{ width: "90px", height: "90px" }}
          className="mb-2"
        />
      </div>

      <h3 className="fw-bold text-info text-center">Definir Nova Senha</h3>
      <p className="text-secondary text-center mb-4">
        Insira o código recebido e sua nova senha
      </p>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label text-light">E-mail</label>
          <input
            className="form-control bg-dark text-light border-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Token</label>
          <input
            className="form-control bg-dark text-light border-secondary"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Código recebido"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Nova senha</label>
          <input
            type="password"
            className="form-control bg-dark text-light border-secondary"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a nova senha"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 fw-bold"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>

        <div className="text-center mt-3">
          <Link to="/recuperarSenha" className="small text-info text-decoration-none">
            Voltar
          </Link>
        </div>
      </form>
    </>
  );
}

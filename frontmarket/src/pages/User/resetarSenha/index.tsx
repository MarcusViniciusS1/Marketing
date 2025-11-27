import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registrarNovaSenha } from "../../../services/usuarioService";

export default function ResetarSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega o e-mail da tela anterior
  const [email, setEmail] = useState(location.state?.email || "");
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registrarNovaSenha({ email, token, senha });
      alert("Senha alterada com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao alterar senha. Verifique o código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-3">
        <img src="/img/logo.png" alt="logo" style={{ width: "90px", height: "90px" }} className="mb-2" />
      </div>
      <h3 className="fw-bold text-primary text-center">Definir Nova Senha</h3>
      <p className="text-secondary text-center mb-4">Insira o código recebido e sua nova senha</p>

      <form onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary small">E-mail</label>
          <input
            className="form-control p-3 border-0 bg-light"
            style={{ borderRadius: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary small">Código</label>
          <input
            className="form-control p-3 border-0 bg-light text-center fw-bold"
            style={{ borderRadius: "10px", letterSpacing: "3px" }}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="000000"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary small">Nova senha</label>
          <input
            type="password"
            className="form-control p-3 border-0 bg-light"
            style={{ borderRadius: "10px" }}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100 fw-bold py-3 shadow-sm" disabled={loading} style={{ borderRadius: "12px" }}>
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>
        <div className="text-center mt-3">
          <Link to="/recuperarSenha" className="small text-primary text-decoration-none fw-bold">Reenviar código</Link>
        </div>
      </form>
    </>
  );
}
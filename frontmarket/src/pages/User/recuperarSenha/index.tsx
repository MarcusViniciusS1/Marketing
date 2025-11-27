import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recuperarSenha } from "../../../services/usuarioService";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await recuperarSenha({ email });
      alert("Código enviado! Verifique seu e-mail.");
      // Passa o email para a próxima tela
      navigate("/registrarNovaSenha", { state: { email: email } });
    } catch {
      alert("Erro ao enviar código. Verifique o e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-3">
        <img src="/img/logo.png" alt="logo" style={{ width: "90px", height: "90px" }} className="mb-2" />
      </div>
      <h3 className="fw-bold text-primary text-center">Recuperar Senha</h3>
      <p className="text-secondary text-center mb-4">Enviaremos um código para seu e-mail</p>

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary small">E-mail cadastrado</label>
          <input
            type="email"
            className="form-control p-3 border-0 bg-light"
            style={{ borderRadius: "10px" }}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100 fw-bold py-3 shadow-sm" type="submit" disabled={loading} style={{ borderRadius: "12px" }}>
          {loading ? "Enviando..." : "Enviar código"}
        </button>
        <div className="text-center mt-3">
          <Link to="/" className="small text-primary text-decoration-none fw-bold">Voltar ao Login</Link>
        </div>
      </form>
    </>
  );
}
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
      alert("Código enviado! Veja seu e-mail.");
            navigate("/registrarNovaSenha");

    } catch {
      alert("Erro ao enviar código.");
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

      <h3 className="fw-bold text-info text-center">Recuperar Senha</h3>
      <p className="text-secondary text-center mb-4">
        Enviaremos um código para seu e-mail
      </p>

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label text-light">E-mail cadastrado</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-secondary"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

         <button className="btn btn-info w-100 fw-bold" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar código"}
            </button>

        <div className="text-center mt-3">
          <Link to="/" className="small text-info text-decoration-none">
            Voltar ao Login
          </Link>
        </div>
      </form>
    </>
  );
}

import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h3 className="text-center mb-4">Login</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" placeholder="Digite seu e-mail" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" placeholder="Digite sua senha" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>

      <div className="text-center mt-3">
        <span>Não tem conta? </span>
        <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </>
  );
}

export default Login;
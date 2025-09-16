import { Link } from "react-router-dom";

function Cadastro() {
  return (
    <>
      <h3 className="text-center mb-4">Cadastro</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" placeholder="Digite seu nome" />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" placeholder="Digite seu e-mail" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" placeholder="Crie uma senha" />
        </div>
        <button type="submit" className="btn btn-success w-100">Cadastrar</button>
      </form>

      <div className="text-center mt-3">
        <span>Já tem conta? </span>
        <Link to="/login">Entrar</Link>
      </div>
    </>
  );
}

export default Cadastro;
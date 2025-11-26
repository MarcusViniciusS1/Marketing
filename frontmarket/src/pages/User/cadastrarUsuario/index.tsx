import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cadastrarUsuario, type UsuarioRequest } from "../../../services/usuarioService";

export default function CadastrarUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UsuarioRequest>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    telefone: "",
    role: "USER",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await cadastrarUsuario(formData);
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
      console.error(error);
    }
  };

  return (
    <>
      {/* LOGO IGUAL AO LOGIN */}
      <div className="text-center mb-4">
        <img
          src="/img/logo.png"
          alt="Logo"
          className="mb-3"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <h3 className="fw-bold text-info text-center">Criar conta</h3>
      <p className="text-secondary text-center mb-4">
        Preencha os dados para continuar
      </p>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-3">
          <label className="form-label text-light">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>

        {/* CPF */}
        <div className="mb-3">
          <label className="form-label text-light">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            placeholder="000.000.000-00"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>

        {/* Senha */}
        <div className="mb-3">
          <label className="form-label text-light">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>

        {/* Telefone */}
        <div className="mb-3">
          <label className="form-label text-light">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="form-control bg-dark text-light border-secondary"
            required
          />
        </div>

        {/* Botão */}
        <button type="submit" className="btn btn-info w-100 fw-bold mt-2">
          Cadastrar Usuário
        </button>
      </form>
    </>
  );
}

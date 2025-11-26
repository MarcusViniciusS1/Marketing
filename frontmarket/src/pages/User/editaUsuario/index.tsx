import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  buscarUsuarioLogado,
  editarUsuario,
  type UsuarioRequest,
  type UsuarioRequestEdicao,
} from "../../../services/usuarioService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export default function EditarUsuario() {
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

 
  useEffect(() => {
    if (!token) {
      navigate("/"); 
    }
  }, [token, navigate]);


  const [formData, setFormData] = useState<UsuarioRequestEdicao>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    role: "USER",
  });

  useEffect(() => {
    async function load() {
      try {
        const usuario = await buscarUsuarioLogado();
        setFormData({
          nome: usuario.nome,
          cpf: usuario.cpf,
          email: usuario.email,
          telefone: usuario.telefone,
          role: usuario.role,
        });
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar dados do usuário!");
      }
    }

    load();
  }, []);

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
      await editarUsuario(formData);
      alert("Usuário atualizado com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Erro ao atualizar usuário!");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-dark">Editar Usuário</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label text-dark">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-dark">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-dark">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>

             <div className="mb-3">
          <label className="form-label text-dark">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

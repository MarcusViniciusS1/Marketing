import { useState } from "react";

function EditarConta() {
  const [email, setEmail] = useState("usuario@email.com");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [preview, setPreview] = useState<string | null>("https://via.placeholder.com/120");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha && novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log({
      email,
      senhaAtual,
      novaSenha,
      preview,
    });

    alert("Conta atualizada com sucesso!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4 mt-4" style={{ width: "450px", borderRadius: "20px" }}>
        <h3 className="text-center mb-4">Editar Conta</h3>

        {/* Foto do usuário */}
        <div className="text-center mb-4">
          <img
            src={preview || "https://via.placeholder.com/120"}
            alt="Preview"
            className="rounded-circle border"
            width={120}
            height={120}
          />
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha atual */}
          <div className="mb-3">
            <label className="form-label fw-bold">Senha Atual</label>
            <input
              type="password"
              className="form-control"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
            />
          </div>

          {/* Nova senha */}
          <div className="mb-3">
            <label className="form-label fw-bold">Nova Senha</label>
            <input
              type="password"
              className="form-control"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
            />
          </div>

          {/* Confirmar nova senha */}
          <div className="mb-3">
            <label className="form-label fw-bold">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme a nova senha"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarConta;

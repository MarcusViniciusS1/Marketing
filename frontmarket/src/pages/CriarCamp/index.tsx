import React, { useState } from "react";

type CampaignData = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  targetAudience: string;
};

const CriarCamp: React.FC = () => {
  const [form, setForm] = useState<CampaignData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: 0,
    targetAudience: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campanha criada:", form);
    alert("Campanha criada com sucesso!");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Criar Nova Campanha de Marketing</h1>

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Nome da Campanha:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="form-control"
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Início:</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Término:</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Orçamento (R$):</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            className="form-control"
            min={0}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Público Alvo:</label>
          <input
            type="text"
            name="targetAudience"
            value={form.targetAudience}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Criar Campanha
        </button>
      </form>
    </div>
  );
};

export default CriarCamp;

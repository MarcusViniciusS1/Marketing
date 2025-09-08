import React, { useState } from 'react';

type CampaignData = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  targetAudience: string;
};

const NewCampaign: React.FC = () => {
  const [form, setForm] = useState<CampaignData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    targetAudience: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Campanha criada:', form);
    // Aqui você pode fazer uma chamada para API, ex: axios.post('/api/campaigns', form)
    alert('Campanha criada com sucesso!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Criar Nova Campanha de Marketing</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nome da Campanha:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Descrição:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          Data de Início:
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Data de Término:
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Orçamento (R$):
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
            style={styles.input}
            min={0}
          />
        </label>

        <label style={styles.label}>
          Público Alvo:
          <input
            type="text"
            name="targetAudience"
            value={form.targetAudience}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>Criar Campanha</button>
      </form>
    </div>
  );
};

// Estilo básico (pode substituir por CSS, Tailwind ou Styled Components)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    minHeight: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NewCampaign;

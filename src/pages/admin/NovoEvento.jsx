import { useState } from "react";

export default function NovoEvento() {
  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    imagem: "",
    dataInicio: "",
    dataFim: "",
    local: "",
    laboratorio: "",
    tags: []
  });

  const TAGS = ["Simpósio", "Congresso", "Workshop", "Oncologia"];
  const LABS = ["INCT", "LAPGENIC"];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
    }));
  }

  return (
    <div className="admin-page">
      <h1>Novo Evento</h1>

      <form className="admin-form">
        <input
          name="titulo"
          placeholder="Título do evento"
          onChange={handleChange}
        />

        <textarea
          name="resumo"
          rows={3}
          placeholder="Resumo do evento"
          onChange={handleChange}
        />

        <textarea
          name="conteudo"
          rows={8}
          placeholder="Descrição completa / programação"
          onChange={handleChange}
        />

        <input
          name="imagem"
          placeholder="URL da imagem"
          onChange={handleChange}
        />

        <div className="form-row">
          <div className="form-group">
            <label>Data início</label>
            <input type="date" name="dataInicio" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Data fim</label>
            <input type="date" name="dataFim" onChange={handleChange} />
          </div>
        </div>

        <input
          name="local"
          placeholder="Local do evento"
          onChange={handleChange}
        />

        <select name="laboratorio" onChange={handleChange}>
          <option value="">Laboratório</option>
          {LABS.map((lab) => (
            <option key={lab}>{lab}</option>
          ))}
        </select>

        <div className="tag-selector">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={form.tags.includes(tag) ? "tag active" : "tag"}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <button type="button" className="btn-primary">
          Salvar Evento
        </button>
      </form>
    </div>
  );
}

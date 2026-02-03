import { useState } from "react";

export default function NovaNoticia() {
  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    imagem: "",
    data: "",
    laboratorio: "",
    tags: [],
    publicado: false
  });

  const TAGS = ["CRISPR", "Terapia Gênica", "Oncologia", "Nanotecnologia"];
  const LABS = ["INCT", "LAPGENIC"];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
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
      <h1>Nova Notícia</h1>

      <form className="admin-form">
        <div className="form-group">
          <label>Título</label>
          <input
            name="titulo"
            maxLength={160}
            placeholder="Título da notícia"
            onChange={handleChange}
          />
          <small>{form.titulo.length}/160</small>
        </div>

        <div className="form-group">
          <label>Resumo</label>
          <textarea
            name="resumo"
            maxLength={280}
            rows={3}
            placeholder="Resumo curto para listagem"
            onChange={handleChange}
          />
          <small>{form.resumo.length}/280</small>
        </div>

        <div className="form-group">
          <label>Conteúdo completo</label>
          <textarea
            name="conteudo"
            rows={8}
            placeholder="Texto completo da notícia"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Imagem (URL)</label>
          <input
            name="imagem"
            placeholder="https://..."
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Data de publicação</label>
          <input type="date" name="data" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Laboratório</label>
          <select name="laboratorio" onChange={handleChange}>
            <option value="">Selecione</option>
            {LABS.map((lab) => (
              <option key={lab}>{lab}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
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
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            name="publicado"
            onChange={handleChange}
          />
          Publicar imediatamente
        </label>

        <button type="button" className="btn-primary">
          Salvar Notícia
        </button>
      </form>
    </div>
  );
}

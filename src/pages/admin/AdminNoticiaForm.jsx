import { useState } from "react";
import { createNoticia } from "../../services/noticias.service";

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

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setLoading(true);

    try {
      await createNoticia(form);
      setSucesso(true);
      setForm({
        titulo: "",
        resumo: "",
        conteudo: "",
        imagem: "",
        data: "",
        laboratorio: "",
        tags: [],
        publicado: false
      });
    } catch (erro) {
      setErro("Erro ao criar notícia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>Nova Notícia</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            maxLength={160}
            required
          />
          <small>{form.titulo.length}/160</small>
        </div>

        <div className="form-group">
          <label>Resumo</label>
          <textarea
            name="resumo"
            value={form.resumo}
            onChange={handleChange}
            maxLength={280}
            rows={3}
            required
          />
          <small>{form.resumo.length}/280</small>
        </div>

        <div className="form-group">
          <label>Conteúdo completo</label>
          <textarea
            name="conteudo"
            value={form.conteudo}
            rows={8}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Imagem (URL)</label>
          <input
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Data de publicação</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Laboratório</label>
          <select
            name="laboratorio"
            value={form.laboratorio}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {LABS.map((lab) => (
              <option key={lab} value={lab}>
                {lab}
              </option>
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
            checked={form.publicado}
            onChange={handleChange}
          />
          Publicar imediatamente
        </label>

        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">Notícia criada com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Notícia"}
        </button>
      </form>
    </div>
  );
}

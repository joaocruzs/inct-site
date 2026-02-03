import { useState } from "react";
import { createPublicacao } from "../../services/publicacoes.service";

export default function NovaPublicacao() {
  const [form, setForm] = useState({
    titulo: "",
    autores: "",
    ano: "",
    link: "",
    post_img: "",
    tags: []
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const TAGS_DISPONIVEIS = [
    "siRNA",
    "CRISPR",
    "Nanotecnologia",
    "Terapia Gênica"
  ];

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

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setLoading(true);

    try {
      await createPublicacao({
        ...form,
        ano: Number(form.ano)
      });

      setSucesso(true);
      setForm({
        titulo: "",
        autores: "",
        ano: "",
        link: "",
        post_img: "",
        tags: []
      });
    } catch (err) {
      setErro("Erro ao criar publicação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>Nova Publicação</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* TÍTULO */}
        <div className="form-group">
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            maxLength={150}
            required
          />
          <small>{form.titulo.length}/150</small>
        </div>

        {/* AUTORES */}
        <div className="form-group">
          <label>Autores</label>
          <input
            name="autores"
            value={form.autores}
            onChange={handleChange}
            maxLength={120}
            required
          />
        </div>

        {/* ANO */}
        <div className="form-group">
          <label>Ano</label>
          <input
            type="number"
            name="ano"
            value={form.ano}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        {/* LINK */}
        <div className="form-group">
          <label>Link (DOI ou URL)</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            maxLength={200}
            required
          />
        </div>

        {/* IMAGEM */}
        <div className="form-group">
          <label>Imagem (URL)</label>
          <input
            name="post_img"
            value={form.post_img}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        {/* TAGS */}
        <div className="form-group">
          <label>Tags</label>
          <div className="tag-selector">
            {TAGS_DISPONIVEIS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={form.tags.includes(tag) ? "tag active" : "tag"}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS */}
        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">Publicação criada com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Publicação"}
        </button>
      </form>
    </div>
  );
}

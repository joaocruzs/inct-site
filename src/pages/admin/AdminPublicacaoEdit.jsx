import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtigoById, updateArtigo } from "../../services/artigos.service";

const TAGS_DISPONIVEIS = ["siRNA", "CRISPR", "Nanotecnologia", "Terapia Gênica"];

export default function AdminPublicacaoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregarArtigo() {
      try {
        const data = await getArtigoById(id);

        setForm({
          titulo:   data.titulo   ?? "",
          autores:  data.autores  ?? "",
          ano:      data.ano      ?? "",
          link:     data.link     ?? "",
          post_img: data.post_img ?? "",
          tags:     data.tags     ?? []
        });
      } catch (err) {
        setErro("Erro ao carregar publicação.");
      } finally {
        setCarregando(false);
      }
    }

    carregarArtigo();
  }, [id]);

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
      const payload = { ...form, ano: Number(form.ano) };

      await updateArtigo(id, payload);

      setSucesso(true);

      setTimeout(() => navigate("/admin/publicacoes"), 1000);
    } catch (err) {
      setErro(err.message || "Erro ao atualizar publicação.");
    } finally {
      setLoading(false);
    }
  }

  if (carregando) {
    return (
      <div className="admin-page">
        <p>Carregando publicação...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="admin-page">
        <p className="error">{erro || "Publicação não encontrada."}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Editar Publicação</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
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

        <div className="form-group">
          <label>Imagem (URL)</label>
          <input
            name="post_img"
            value={form.post_img}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

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

        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">Publicação atualizada com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar Publicação"}
        </button>
      </form>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createArtigo,
  updateArtigo,
  getArtigoById
} from "../../services/artigos.service";

export default function AdminPublicacaoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

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

  /* 🔹 Carrega dados se for edição */
  useEffect(() => {
    async function fetchData() {
      if (!isEdit) return;

      try {
        setLoading(true);
        const data = await getArtigoById(id);

        setForm({
          titulo: data.titulo || "",
          autores: data.autores || "",
          ano: data.ano || "",
          link: data.link || "",
          post_img: data.post_img || "",
          tags: data.tags || []
        });
      } catch {
        setErro("Erro ao carregar publicação.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isEdit]);

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
      const payload = {
        ...form,
        ano: Number(form.ano)
      };

      console.log("Payload enviado:", payload);

      if (isEdit) {
        await updateArtigo(id, payload);
      } else {
        await createArtigo(payload);
      }

      setSucesso(true);
      setTimeout(() => navigate("/admin/publicacoes"), 1000);

    } catch (err) {
      console.error("Erro capturado:", err);
      setErro("Erro ao salvar publicação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>{isEdit ? "Editar Publicação" : "Nova Publicação"}</h1>

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
        {sucesso && (
          <p className="success">
            {isEdit
              ? "Publicação atualizada com sucesso!"
              : "Publicação criada com sucesso!"}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Salvando..."
            : isEdit
              ? "Atualizar Publicação"
              : "Salvar Publicação"}
        </button>
      </form>
    </div>
  );
}
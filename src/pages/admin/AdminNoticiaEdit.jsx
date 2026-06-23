import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getNoticiaById,
  updateNoticia
} from "../../services/noticias.service";

const TAGS = ["Imprensa", "Conquistas", "Defesas", "Eventos", "Resultados", "INCT"];

const LABS = [
  "INCT", "BIOTECFARM", "GEHMED", "LABCANCER - UFPI", "LABCANCER - UFSC",
  "LABGEN", "LABNANO", "LAFAN", "LAGMES", "LAMON", "LaPAF", "LAPGENIC",
  "LaPIB", "LGI", "LMBM", "LSC", "LVGBM", "ONCOFAR", "ONCOFARLAB",
  "PUC RIO", "NPO"
];

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function AdminNoticiaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [urlImprensa, setUrlImprensa] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregarNoticia() {
      try {
        const noticia = await getNoticiaById(id);

        const isImprensa = noticia.tags?.includes("Imprensa");

        setForm({
          titulo: noticia.titulo ?? "",
          resumo: noticia.resumo ?? "",
          conteudo: isImprensa ? "" : (noticia.conteudo ?? ""),
          imagem: noticia.imagem ?? "",
          data: noticia.data ?? "",
          laboratorio: noticia.laboratorio ?? "",
          tags: noticia.tags ?? [],
          publicado: noticia.publicado ?? false
        });

        if (isImprensa) {
          setUrlImprensa(noticia.conteudo ?? "");
        }
      } catch (err) {
        setErro("Erro ao carregar notícia.");
      } finally {
        setCarregando(false);
      }
    }

    carregarNoticia();
  }, [id]);

  const isImprensa = form?.tags.includes("Imprensa");

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
      let conteudoFinal = form.conteudo;

      if (isImprensa) {
        if (!isValidUrl(urlImprensa)) {
          throw new Error("URL externa inválida");
        }
        conteudoFinal = urlImprensa;
      }

      const payload = {
        ...form,
        conteudo: conteudoFinal,
        laboratorio: form.laboratorio || undefined
      };

      await updateNoticia(id, payload);

      setSucesso(true);

      setTimeout(() => {
        navigate("/admin/noticias");
      }, 1000);

    } catch (err) {
      setErro(err.message || "Erro ao atualizar notícia.");
    } finally {
      setLoading(false);
    }
  }

  if (carregando) {
    return (
      <div className="admin-page">
        <p>Carregando notícia...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="admin-page">
        <p className="error">{erro || "Notícia não encontrada."}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Editar Notícia</h1>

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

        {!isImprensa ? (
          <div className="form-group">
            <label>Conteúdo completo</label>
            <textarea
              name="conteudo"
              value={form.conteudo}
              rows={8}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>URL da notícia externa</label>
            <input
              value={urlImprensa}
              onChange={(e) => setUrlImprensa(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
        )}

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
          >
            <option value="">Geral / INCT</option>
            {LABS.map((lab) => (
              <option key={lab} value={lab}>{lab}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div>
            {TAGS.map((tag) => (
              <label key={tag} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={form.tags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                {tag}
              </label>
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
        {sucesso && <p className="success">Notícia atualizada com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar Notícia"}
        </button>
      </form>
    </div>
  );
}
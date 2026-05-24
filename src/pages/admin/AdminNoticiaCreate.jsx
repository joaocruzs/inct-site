import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createNoticia } from "../../services/noticias.service";

const TAGS = ["INCT", "Imprensa"];

const LABS = [
  "INCT", "BIOTECFARM", "GEHMED", "LABCANCER - UFPI", "LABCANCER - UFSC",
  "LABGEN", "LABNANO", "LAFAN", "LAGMES", "LAMON", "LaPAF", "LAPGENIC",
  "LaPIB", "LGI", "LMBM", "LSC", "LVGBM", "ONCOFAR", "ONCOFARLAB",
  "PUC RIO", "NPO"
];

const FORM_INICIAL = {
  titulo: "",
  resumo: "",
  conteudo: "",
  imagem: "",
  data: "",
  laboratorio: "",
  tags: [],
  publicado: false
};

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function AdminNoticiaCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState(FORM_INICIAL);
  const [urlImprensa, setUrlImprensa] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const isImprensa = form.tags.includes("Imprensa");

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

      await createNoticia(payload);

      setSucesso(true);
      setForm(FORM_INICIAL);
      setUrlImprensa("");

      setTimeout(() => {
        navigate("/admin/noticias");
      }, 1000);

    } catch (err) {
      setErro(err.message || "Erro ao criar notícia.");
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
        {sucesso && <p className="success">Notícia criada com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Notícia"}
        </button>
      </form>
    </div>
  );
}
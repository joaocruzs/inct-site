import { useState } from "react";
import { createEvento } from "../../services/eventos.service";

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

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setLoading(true);

    try {
      await createEvento(form);
      setSucesso(true);
      setForm({
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
    } catch (erro) {
      setErro("Erro ao criar evento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>Novo Evento</h1>

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
          <label>Resumo</label>
          <textarea
            name="resumo"
            value={form.resumo}
            maxLength={280}
            rows={3}
            onChange={handleChange}
            required
          />
          <small>{form.resumo.length}/280</small>
        </div>

        <div className="form-group">
          <label>Conteúdo / Programação</label>
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

        <div className="form-row">
          <div className="form-group">
            <label>Data início</label>
            <input
              type="date"
              name="dataInicio"
              value={form.dataInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Data fim</label>
            <input
              type="date"
              name="dataFim"
              value={form.dataFim}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Local</label>
          <input
            name="local"
            value={form.local}
            onChange={handleChange}
            maxLength={120}
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
        {sucesso && <p className="success">Evento criado com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Evento"}
        </button>
      </form>
    </div>
  );
}

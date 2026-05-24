import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getEventoById, updateEvento } from "../../services/eventos.service";

const TAGS = ["Simpósio", "Congresso", "Workshop", "Oncologia"];
const LABS = ["INCT", "LAPGENIC"];

export default function AdminEventoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregarEvento() {
      try {
        const evento = await getEventoById(id);

        setForm({
          titulo:      evento.titulo      ?? "",
          resumo:      evento.resumo      ?? "",
          conteudo:    evento.conteudo    ?? "",
          imagem:      evento.imagem      ?? "",
          dataInicio:  evento.dataInicio  ?? "",
          dataFim:     evento.dataFim     ?? "",
          local:       evento.local       ?? "",
          laboratorio: evento.laboratorio ?? "",
          tags:        evento.tags        ?? []
        });
      } catch (err) {
        setErro("Erro ao carregar evento.");
      } finally {
        setCarregando(false);
      }
    }

    carregarEvento();
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
      await updateEvento(id, form);
      setSucesso(true);

      setTimeout(() => {
        navigate("/admin/eventos");
      }, 1000);
    } catch (err) {
      setErro(err.message || "Erro ao atualizar evento.");
    } finally {
      setLoading(false);
    }
  }

  if (carregando) {
    return (
      <div className="admin-page">
        <p>Carregando evento...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="admin-page">
        <p className="error">{erro || "Evento não encontrado."}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Editar Evento</h1>

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
        {sucesso && <p className="success">Evento atualizado com sucesso!</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar Evento"}
        </button>
      </form>
    </div>
  );
}
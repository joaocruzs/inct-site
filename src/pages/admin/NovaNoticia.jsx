import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function NovaNoticia() {
  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    data: "",
    laboratorio: "",
    tags: [],
    imagem: ""
  });

  function updateField(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
    }));
  }

  function submit(e) {
    e.preventDefault();

    console.log("NOVA NOTÍCIA:", form);

    // FUTURO:
    // fetch("/api/noticias", { method: "POST", body: JSON.stringify(form) })
  }

  const tagsDisponiveis = [
    "LAPGENIC",
    "Pesquisa",
    "Evento",
    "Publicação",
    "INCT"
  ];

  return (
    <AdminLayout title="Nova Notícia">
      <form className="admin-form" onSubmit={submit}>
        <label>Título</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={updateField}
          required
        />

        <label>Resumo</label>
        <textarea
          name="resumo"
          value={form.resumo}
          onChange={updateField}
          rows={3}
        />

        <label>Conteúdo completo</label>
        <textarea
          name="conteudo"
          value={form.conteudo}
          onChange={updateField}
          rows={8}
        />

        <label>Data</label>
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={updateField}
          required
        />

        <label>Laboratório</label>
        <select
          name="laboratorio"
          value={form.laboratorio}
          onChange={updateField}
        >
          <option value="">Selecione</option>
          <option value="lapgenic">LAPGENIC</option>
          <option value="inct">INCT</option>
        </select>

        <label>Imagem (URL)</label>
        <input
          name="imagem"
          value={form.imagem}
          onChange={updateField}
        />

        <label>Tags</label>
        <div className="admin-tags">
          {tagsDisponiveis.map((tag) => (
            <button
              type="button"
              key={tag}
              className={form.tags.includes(tag) ? "active" : ""}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <button type="submit" className="admin-submit">
          Publicar Notícia
        </button>
      </form>
    </AdminLayout>
  );
}

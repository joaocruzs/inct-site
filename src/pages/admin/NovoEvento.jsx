import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function NovoEvento() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataInicio: "",
    dataFim: "",
    local: "",
    laboratorio: "",
    imagem: ""
  });

  function updateField(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function submit(e) {
    e.preventDefault();

    console.log("NOVO EVENTO:", form);

    // FUTURO:
    // fetch("/api/eventos", { method: "POST", body: JSON.stringify(form) })
  }

  return (
    <AdminLayout title="Novo Evento">
      <form className="admin-form" onSubmit={submit}>
        <label>Título do Evento</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={updateField}
          required
        />

        <label>Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={updateField}
          rows={6}
        />

        <label>Data de Início</label>
        <input
          type="date"
          name="dataInicio"
          value={form.dataInicio}
          onChange={updateField}
        />

        <label>Data de Término</label>
        <input
          type="date"
          name="dataFim"
          value={form.dataFim}
          onChange={updateField}
        />

        <label>Local</label>
        <input
          name="local"
          value={form.local}
          onChange={updateField}
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

        <button type="submit" className="admin-submit">
          Publicar Evento
        </button>
      </form>
    </AdminLayout>
  );
}

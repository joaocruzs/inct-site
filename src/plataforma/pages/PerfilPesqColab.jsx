import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { updateMe, updateFoto } from "../services/pesquisadores.js";
import { clearImageCache } from "../components/GrafoViz.jsx";

export default function PerfilPesqColab() {
  const { user, refreshUser } = useAuth();
  const fotoInputRef = useRef(null);
  const [form, setForm] = useState({
    titulacao: user?.titulacao ?? "",
    areas: user?.areas?.join(", ") ?? "",
    lattes: user?.lattes ?? "",
    resumo: user?.resumo ?? "",
  });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    try {
      await updateMe({
        titulacao: form.titulacao || null,
        areas: form.areas
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        lattes: form.lattes || null,
        resumo: form.resumo || null,
      });
      setSucesso(true);
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleFoto(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    try {
      clearImageCache(user?.foto);
      await updateFoto(arquivo);
      await refreshUser();
    } catch (err) {
      setErro(err.message);
    }
    e.target.value = "";
  }

  return (
    <div className="perfil-page">
      <h1>Meu perfil</h1>

      <div className="perfil-page__foto">
        {user?.foto ? (
          <img src={user.foto} alt="Foto de perfil" />
        ) : (
          <div className="perfil-page__foto-placeholder">
            {user?.nomeCompleto?.[0]}
          </div>
        )}
        <button className="btn-secundario" onClick={() => fotoInputRef.current.click()}>
          Alterar foto
        </button>
        <input
          ref={fotoInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFoto}
        />
      </div>

      <div className="perfil-page__info">
        <p className="perfil-page__nome">{user?.nomeCompleto}</p>
        <p className="perfil-page__universidade">{user?.universidade}</p>
        <p className="perfil-page__email">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <label>Titulação</label>
        <input
          value={form.titulacao}
          onChange={(e) => setForm({ ...form, titulacao: e.target.value })}
          placeholder="Ex: Doutor, Mestre"
        />

        <label>
          Áreas de atuação <small>(separadas por vírgula)</small>
        </label>
        <input
          value={form.areas}
          onChange={(e) => setForm({ ...form, areas: e.target.value })}
          placeholder="Ex: Oncologia, Genômica"
        />

        <label>Currículo Lattes</label>
        <input
          value={form.lattes}
          onChange={(e) => setForm({ ...form, lattes: e.target.value })}
          placeholder="URL do Lattes"
        />

        <label>
          Resumo <small>({form.resumo.length}/200)</small>
        </label>
        <textarea
          value={form.resumo}
          onChange={(e) => setForm({ ...form, resumo: e.target.value })}
          maxLength={200}
          rows={3}
          placeholder="Descreva sua atuação"
        />

        {sucesso && <p style={{ color: "green" }}>Perfil atualizado!</p>}
        {erro && <p className="modal__erro">{erro}</p>}

        <button type="submit" className="admin-submit">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

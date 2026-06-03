import { useMemo, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { updateMe, updateFoto } from "../services/pesquisadores.js";
import { clearImageCache } from "./GrafoViz.jsx";
import { normalizar } from "../utils/texto.js";

function CardPerfil({ onPerfilAtualizado }) {
  const { user, refreshUser } = useAuth();
  const fotoInputRef = useRef(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    titulacao: user?.titulacao ?? "",
    areas: user?.areas?.join(", ") ?? "",
    lattes: user?.lattes ?? "",
    resumo: user?.resumo ?? "",
    papel: user?.papel ?? "",
    coordenadorNome: user?.coordenadorNome ?? "",
  });
  const [salvando, setSalvando] = useState(false);

  async function handleFoto(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    clearImageCache(user?.foto);
    await updateFoto(arquivo);
    await refreshUser();
    e.target.value = "";
  }

  async function handleSalvar(e) {
    e.preventDefault();
    setSalvando(true);
    try {
      await updateMe({
        titulacao: form.titulacao.trim() || null,
        areas: form.areas.split(",").map((a) => a.trim()).filter(Boolean),
        lattes: form.lattes.trim() || null,
        resumo: form.resumo.trim() || null,
        papel: form.papel || null,
        coordenadorNome: form.papel === "vinculado" ? (form.coordenadorNome.trim() || null) : null,
      });
      await refreshUser();
      onPerfilAtualizado?.();
      setEditando(false);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="painel-perfil">
      <div className="painel-perfil__topo">
        <button
          className="painel-perfil__foto-btn"
          onClick={() => fotoInputRef.current.click()}
          title="Alterar foto"
        >
          {user?.foto ? (
            <img src={user.foto} alt="Foto" className="painel-perfil__foto" />
          ) : (
            <div className="painel-perfil__foto-placeholder">
              {user?.nomeCompleto?.[0]}
            </div>
          )}
          <span className="painel-perfil__foto-overlay">✎</span>
        </button>
        <input
          ref={fotoInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFoto}
        />
        <div className="painel-perfil__info">
          <p className="painel-perfil__nome">{user?.nomeCompleto}</p>
          <p className="painel-perfil__univ">{user?.universidade}</p>
          {user?.titulacao && (
            <p className="painel-perfil__titulacao">{user.titulacao}</p>
          )}
        </div>
      </div>

      {!editando ? (
        <>
          {user?.resumo && (
            <p className="painel-perfil__resumo">{user.resumo}</p>
          )}
          <button
            className="painel-perfil__editar"
            onClick={() => {
              setForm({
                titulacao: user?.titulacao ?? "",
                areas: user?.areas?.join(", ") ?? "",
                lattes: user?.lattes ?? "",
                resumo: user?.resumo ?? "",
                papel: user?.papel ?? "",
                coordenadorNome: user?.coordenadorNome ?? "",
              });
              setEditando(true);
            }}
          >
            Editar perfil
          </button>
        </>
      ) : (
        <form onSubmit={handleSalvar} className="painel-perfil__form">
          <input
            value={form.titulacao}
            onChange={(e) => setForm({ ...form, titulacao: e.target.value })}
            placeholder="Titulação"
          />
          <input
            value={form.areas}
            onChange={(e) => setForm({ ...form, areas: e.target.value })}
            placeholder="Áreas (separadas por vírgula)"
          />
          <input
            value={form.lattes}
            onChange={(e) => setForm({ ...form, lattes: e.target.value })}
            placeholder="URL do Lattes"
          />
          <textarea
            value={form.resumo}
            onChange={(e) => setForm({ ...form, resumo: e.target.value })}
            placeholder="Resumo de atuação"
            maxLength={200}
            rows={3}
          />
          <select
            value={form.papel}
            onChange={(e) => setForm({ ...form, papel: e.target.value, coordenadorNome: "" })}
          >
            <option value="">Papel não informado</option>
            <option value="coordenador">Coordenador</option>
            <option value="vinculado">Vinculado a um coordenador</option>
          </select>
          {form.papel === "vinculado" && (
            <input
              value={form.coordenadorNome}
              onChange={(e) => setForm({ ...form, coordenadorNome: e.target.value })}
              placeholder="Nome do coordenador"
            />
          )}
          <div className="painel-perfil__form-acoes">
            <button type="submit" className="btn-primary" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" className="btn-secundario" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function PainelEsquerdo({ pesquisadores, onPerfilAtualizado }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = normalizar(busca);
    return pesquisadores
      .filter(
        (p) =>
          !termo ||
          normalizar(p.nomeCompleto).includes(termo) ||
          normalizar(p.universidade).includes(termo) ||
          (p.coordenadorNome && normalizar(p.coordenadorNome).includes(termo))
      )
      .sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto, "pt"));
  }, [pesquisadores, busca]);

  return (
    <aside className="painel-esquerdo">
      <CardPerfil onPerfilAtualizado={onPerfilAtualizado} />

      <div className="painel-esquerdo__busca">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar pesquisador..."
        />
      </div>

      <ul className="painel-esquerdo__lista">
        {filtrados.map((p) => (
          <li key={p._id}>
            <div className="painel-esquerdo__item">
              <div className="painel-esquerdo__item-nome">{p.nomeCompleto}</div>
              <div className="painel-esquerdo__item-univ">{p.universidade}</div>
              {p.papel === "coordenador" && (
                <div className="painel-esquerdo__item-papel painel-esquerdo__item-papel--coord">Coordenador</div>
              )}
              {p.papel === "vinculado" && (
                <div className="painel-esquerdo__item-papel painel-esquerdo__item-papel--vinc">
                  Vinculado a {p.coordenadorNome ?? "coordenador não informado"}
                </div>
              )}
              {p.resumo && (
                <div className="painel-esquerdo__item-resumo">{p.resumo}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

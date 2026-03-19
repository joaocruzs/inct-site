import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCursoById,
  createCurso,
  updateCurso,
  addModulo,
  updateModulo,
  deleteModulo,
} from "../../../services/cursos.service";

/* ─── helpers ────────────────────────────────────── */
const TAGS_DISPONIVEIS = [
  "CRISPR",
  "Terapia Gênica",
  "Oncologia",
  "Nanotecnologia",
  "siRNA",
];

const CURSO_INICIAL = {
  titulo: "",
  descricao: "",
  imagem: "",
  tags: [],
  publicado: false,
};

function novaAlternativa() {
  return { texto: "", correta: false };
}

function novaQuestao() {
  return {
    enunciado: "",
    alternativas: [novaAlternativa(), novaAlternativa()],
    explicacao: "",
  };
}

function moduloInicial(totalModulos = 0) {
  return { _id: null, titulo: "", ordem: totalModulos + 1, conteudos: [] };
}

/* ─── componente principal ───────────────────────── */
export default function AdminCursoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  /* estados do curso */
  const [form, setForm]         = useState(CURSO_INICIAL);
  const [cursoId, setCursoId]   = useState(id || null);
  const [loading, setLoading]   = useState(false);
  const [loadingPage, setLoadingPage] = useState(isEdit);
  const [erro, setErro]         = useState("");
  const [sucesso, setSucesso]   = useState("");

  /* estados dos módulos */
  const [modulos, setModulos]       = useState([]);
  const [moduloForm, setModuloForm] = useState(null); // null = oculto

  /* carrega curso em modo edição */
  useEffect(() => {
    if (!isEdit) return;
    getCursoById(id)
      .then((curso) => {
        setForm({
          titulo:    curso.titulo,
          descricao: curso.descricao,
          imagem:    curso.imagem,
          tags:      curso.tags,
          publicado: curso.publicado,
        });
        setModulos(curso.modulos);
      })
      .catch(() => setErro("Erro ao carregar curso."))
      .finally(() => setLoadingPage(false));
  }, [id, isEdit]);

  /* ── curso ── */
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  async function handleSalvarCurso(e) {
    e.preventDefault();
    if (!form.titulo.trim()) { setErro("Título é obrigatório."); return; }
    setErro(""); setSucesso(""); setLoading(true);

    try {
      if (isEdit) {
        await updateCurso(cursoId, form);
        setSucesso("Curso atualizado!");
      } else {
        const res = await createCurso(form);
        const novoId = res._id || res.id;
        setCursoId(novoId);
        setSucesso("Curso criado! Agora adicione os módulos abaixo.");
      }
    } catch (e) {
      setErro(e.message || "Erro ao salvar curso.");
    } finally {
      setLoading(false);
    }
  }

  /* ── módulos ── */
  async function handleDeleteModulo(moduloId) {
    if (!window.confirm("Excluir este módulo?")) return;
    try {
      await deleteModulo(cursoId, moduloId);
      setModulos((prev) => prev.filter((m) => m.id !== moduloId));
    } catch {
      alert("Erro ao excluir módulo.");
    }
  }

  async function handleSalvarModulo() {
    if (!moduloForm.titulo.trim()) { setErro("Título do módulo é obrigatório."); return; }
    setErro(""); setLoading(true);

    const payload = {
      titulo:    moduloForm.titulo,
      ordem:     Number(moduloForm.ordem),
      conteudos: moduloForm.conteudos,
    };

    try {
      if (moduloForm._id) {
        await updateModulo(cursoId, moduloForm._id, payload);
      } else {
        await addModulo(cursoId, payload);
      }
      const cursoAtualizado = await getCursoById(cursoId);
      setModulos(cursoAtualizado.modulos);
      setModuloForm(null);
      setSucesso("Módulo salvo!");
      setTimeout(() => setSucesso(""), 2000);
    } catch (e) {
      setErro(e.message || "Erro ao salvar módulo.");
    } finally {
      setLoading(false);
    }
  }

  /* ── conteúdos do módulo ── */
  function addConteudo(tipo) {
    const novo =
      tipo === "questoes"
        ? { tipo: "questoes", questoes: [novaQuestao()] }
        : { tipo, url: "" };
    setModuloForm((prev) => ({
      ...prev,
      conteudos: [...prev.conteudos, novo],
    }));
  }

  function removeConteudo(idx) {
    setModuloForm((prev) => ({
      ...prev,
      conteudos: prev.conteudos.filter((_, i) => i !== idx),
    }));
  }

  function setConteudoUrl(idx, url) {
    setModuloForm((prev) => {
      const conteudos = [...prev.conteudos];
      conteudos[idx] = { ...conteudos[idx], url };
      return { ...prev, conteudos };
    });
  }

  /* ── questões ── */
  function addQuestao(cIdx) {
    setModuloForm((prev) => {
      const conteudos = [...prev.conteudos];
      conteudos[cIdx] = {
        ...conteudos[cIdx],
        questoes: [...conteudos[cIdx].questoes, novaQuestao()],
      };
      return { ...prev, conteudos };
    });
  }

  function removeQuestao(cIdx, qIdx) {
    setModuloForm((prev) => {
      const conteudos = [...prev.conteudos];
      conteudos[cIdx] = {
        ...conteudos[cIdx],
        questoes: conteudos[cIdx].questoes.filter((_, i) => i !== qIdx),
      };
      return { ...prev, conteudos };
    });
  }

  function setQuestaoField(cIdx, qIdx, campo, valor) {
    setModuloForm((prev) => {
      const conteudos = [...prev.conteudos];
      const questoes  = [...conteudos[cIdx].questoes];
      questoes[qIdx]  = { ...questoes[qIdx], [campo]: valor };
      conteudos[cIdx] = { ...conteudos[cIdx], questoes };
      return { ...prev, conteudos };
    });
  }

  /* ── alternativas ── */
  function addAlternativa(cIdx, qIdx) {
    setModuloForm((prev) => {
      const conteudos   = [...prev.conteudos];
      const questoes    = [...conteudos[cIdx].questoes];
      questoes[qIdx]    = {
        ...questoes[qIdx],
        alternativas: [...questoes[qIdx].alternativas, novaAlternativa()],
      };
      conteudos[cIdx]   = { ...conteudos[cIdx], questoes };
      return { ...prev, conteudos };
    });
  }

  function removeAlternativa(cIdx, qIdx, altIdx) {
    setModuloForm((prev) => {
      const conteudos   = [...prev.conteudos];
      const questoes    = [...conteudos[cIdx].questoes];
      questoes[qIdx]    = {
        ...questoes[qIdx],
        alternativas: questoes[qIdx].alternativas.filter((_, i) => i !== altIdx),
      };
      conteudos[cIdx]   = { ...conteudos[cIdx], questoes };
      return { ...prev, conteudos };
    });
  }

  function setAlternativaField(cIdx, qIdx, altIdx, campo, valor) {
    setModuloForm((prev) => {
      const conteudos   = [...prev.conteudos];
      const questoes    = [...conteudos[cIdx].questoes];
      const alternativas = [...questoes[qIdx].alternativas];

      if (campo === "correta" && valor === true) {
        alternativas.forEach((_, i) => {
          alternativas[i] = { ...alternativas[i], correta: i === altIdx };
        });
      } else {
        alternativas[altIdx] = { ...alternativas[altIdx], [campo]: valor };
      }

      questoes[qIdx]   = { ...questoes[qIdx], alternativas };
      conteudos[cIdx]  = { ...conteudos[cIdx], questoes };
      return { ...prev, conteudos };
    });
  }

  /* ── render ── */
  if (loadingPage) return <div className="admin-page"><p>Carregando...</p></div>;

  return (
    <div className="admin-page">
      <h1>{isEdit ? "Editar Curso" : "Novo Curso"}</h1>

      {/* ======= FORMULÁRIO DO CURSO ======= */}
      <form className="admin-form" onSubmit={handleSalvarCurso}>

        <div className="form-group">
          <label>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} required maxLength={150} />
          <small>{form.titulo.length}/150</small>
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={4}
            maxLength={500}
          />
          <small>{form.descricao.length}/500</small>
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

        <div className="form-group">
          <label>Tags</label>
          <div className="admin-tags">
            {TAGS_DISPONIVEIS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={form.tags.includes(tag) ? "active" : ""}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
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

        {erro    && <p className="error">{erro}</p>}
        {sucesso && <p className="success">{sucesso}</p>}

        <button type="submit" className="admin-submit" disabled={loading}>
          {loading ? "Salvando..." : isEdit ? "Salvar Alterações" : "Criar Curso"}
        </button>
      </form>

      {/* ======= GESTÃO DE MÓDULOS (só aparece após ter cursoId) ======= */}
      {cursoId && (
        <div style={{ marginTop: 40 }}>
          <div className="admin-header">
            <h2>Módulos</h2>
            {!moduloForm && (
              <button
                className="admin-btn primary"
                onClick={() => setModuloForm(moduloInicial(modulos.length))}
              >
                + Adicionar Módulo
              </button>
            )}
          </div>

          {/* LISTA DE MÓDULOS */}
          {modulos.length > 0 && (
            <div className="admin-table" style={{ marginBottom: 24 }}>
              {modulos.map((m) => (
                <div key={m.id} className="admin-row">
                  <div className="admin-cell title">
                    <strong>{m.ordem}. {m.titulo}</strong>
                    <span className="admin-meta">
                      {m.conteudos.length} conteúdo{m.conteudos.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="admin-cell actions">
                    <button
                      className="admin-btn edit"
                      onClick={() =>
                        setModuloForm({ _id: m.id, titulo: m.titulo, ordem: m.ordem, conteudos: m.conteudos })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="admin-btn delete"
                      onClick={() => handleDeleteModulo(m.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FORMULÁRIO DO MÓDULO */}
          {moduloForm && (
            <div className="admin-form" style={{ marginTop: 16 }}>
              <h3 style={{ marginBottom: 8 }}>
                {moduloForm._id ? "Editar Módulo" : "Novo Módulo"}
              </h3>

              <div style={{ display: "flex", gap: 16 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Título do módulo</label>
                  <input
                    value={moduloForm.titulo}
                    onChange={(e) =>
                      setModuloForm((prev) => ({ ...prev, titulo: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group" style={{ width: 100 }}>
                  <label>Ordem</label>
                  <input
                    type="number"
                    min={1}
                    value={moduloForm.ordem}
                    onChange={(e) =>
                      setModuloForm((prev) => ({ ...prev, ordem: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* CONTEÚDOS */}
              <div>
                <label style={{ fontWeight: 600, marginBottom: 10, display: "block" }}>
                  Conteúdos
                </label>

                {moduloForm.conteudos.length === 0 && (
                  <p style={{ color: "#999", fontSize: 14, marginBottom: 12 }}>
                    Nenhum conteúdo adicionado.
                  </p>
                )}

                {moduloForm.conteudos.map((c, cIdx) => (
                  <div key={cIdx} className="modulo-conteudo-item">
                    <div className="modulo-conteudo-header">
                      <span className="modulo-conteudo-tipo">{c.tipo.toUpperCase()}</span>
                      <button
                        type="button"
                        className="admin-btn delete"
                        style={{ padding: "4px 10px", fontSize: 13 }}
                        onClick={() => removeConteudo(cIdx)}
                      >
                        Remover
                      </button>
                    </div>

                    {/* VIDEO / PDF */}
                    {(c.tipo === "video" || c.tipo === "pdf") && (
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>URL</label>
                        <input
                          value={c.url}
                          onChange={(e) => setConteudoUrl(cIdx, e.target.value)}
                          placeholder={
                            c.tipo === "video"
                              ? "https://www.youtube.com/embed/..."
                              : "https://..."
                          }
                        />
                      </div>
                    )}

                    {/* QUESTÕES */}
                    {c.tipo === "questoes" && (
                      <div>
                        {c.questoes.map((q, qIdx) => (
                          <div key={qIdx} className="questao-builder">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                              <strong style={{ fontSize: 14 }}>Questão {qIdx + 1}</strong>
                              {c.questoes.length > 1 && (
                                <button
                                  type="button"
                                  className="admin-btn delete"
                                  style={{ padding: "3px 8px", fontSize: 12 }}
                                  onClick={() => removeQuestao(cIdx, qIdx)}
                                >
                                  Remover
                                </button>
                              )}
                            </div>

                            <div className="form-group">
                              <label>Enunciado</label>
                              <input
                                value={q.enunciado}
                                onChange={(e) => setQuestaoField(cIdx, qIdx, "enunciado", e.target.value)}
                                placeholder="Digite a pergunta..."
                              />
                            </div>

                            <label style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 6 }}>
                              Alternativas
                            </label>
                            {q.alternativas.map((alt, altIdx) => (
                              <div key={altIdx} className="alternativa-row">
                                <input
                                  type="radio"
                                  name={`correta-${cIdx}-${qIdx}`}
                                  checked={alt.correta}
                                  onChange={() => setAlternativaField(cIdx, qIdx, altIdx, "correta", true)}
                                  title="Marcar como correta"
                                />
                                <input
                                  style={{ flex: 1 }}
                                  value={alt.texto}
                                  onChange={(e) => setAlternativaField(cIdx, qIdx, altIdx, "texto", e.target.value)}
                                  placeholder={`Alternativa ${String.fromCharCode(65 + altIdx)}`}
                                />
                                {q.alternativas.length > 2 && (
                                  <button
                                    type="button"
                                    className="admin-btn delete"
                                    style={{ padding: "3px 8px", fontSize: 12 }}
                                    onClick={() => removeAlternativa(cIdx, qIdx, altIdx)}
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              className="admin-btn edit"
                              style={{ fontSize: 13, marginTop: 6 }}
                              onClick={() => addAlternativa(cIdx, qIdx)}
                            >
                              + Alternativa
                            </button>

                            <div className="form-group" style={{ marginTop: 10 }}>
                              <label>Explicação da resposta</label>
                              <textarea
                                rows={2}
                                value={q.explicacao}
                                onChange={(e) => setQuestaoField(cIdx, qIdx, "explicacao", e.target.value)}
                                placeholder="Explique por que a alternativa correta está certa..."
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="admin-btn edit"
                          style={{ fontSize: 13, marginTop: 4 }}
                          onClick={() => addQuestao(cIdx)}
                        >
                          + Nova Questão
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* BOTÕES PARA ADICIONAR CONTEÚDO */}
                <div className="add-conteudo-btns">
                  <button type="button" className="admin-btn edit" onClick={() => addConteudo("video")}>
                    + Vídeo
                  </button>
                  <button type="button" className="admin-btn edit" onClick={() => addConteudo("pdf")}>
                    + PDF
                  </button>
                  <button type="button" className="admin-btn edit" onClick={() => addConteudo("questoes")}>
                    + Questões
                  </button>
                </div>
              </div>

              {/* AÇÕES DO MÓDULO */}
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  type="button"
                  className="admin-submit"
                  style={{ flex: 1 }}
                  disabled={loading}
                  onClick={handleSalvarModulo}
                >
                  {loading ? "Salvando..." : "Salvar Módulo"}
                </button>
                <button
                  type="button"
                  className="admin-btn edit"
                  style={{ padding: "10px 20px" }}
                  onClick={() => { setModuloForm(null); setErro(""); }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* VOLTAR */}
          <div style={{ marginTop: 32 }}>
            <button
              type="button"
              className="admin-btn edit"
              onClick={() => navigate("/admin/cursos")}
            >
              ← Voltar para Cursos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

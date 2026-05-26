import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import PainelEsquerdo from "../components/PainelEsquerdo.jsx";
import {
  listarProjetos,
  criarProjeto,
  editarProjeto,
  excluirProjeto,
  adicionarMembro,
  adicionarAtividade,
  removerAtividade,
  atualizarFase,
} from "../services/projetos.js";
import { getPesquisadores } from "../services/pesquisadores.js";

function formatarData(iso) {
  const d = new Date(iso);
  const data = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  const hora = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${data}, ${hora}`;
}

function ModalNovoProjeto({ onSalvar, onFechar }) {
  const [form, setForm] = useState({ titulo: "", area: "", descricao: "" });
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await criarProjeto(form);
      onSalvar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Novo projeto</h3>
        <form onSubmit={handleSubmit}>
          <label>Título *</label>
          <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
          <label>Área *</label>
          <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} required />
          <label>Descrição</label>
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} />
          {erro && <p className="modal__erro">{erro}</p>}
          <div className="modal__acoes">
            <button type="button" className="btn-secundario" onClick={onFechar}>Cancelar</button>
            <button type="submit" className="btn-primary">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalEditarProjeto({ projeto, onSalvar, onFechar }) {
  const [form, setForm] = useState({
    titulo: projeto.titulo ?? "",
    area: projeto.area ?? "",
    descricao: projeto.descricao ?? "",
  });
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await editarProjeto(projeto._id, form);
      onSalvar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar projeto</h3>
        <form onSubmit={handleSubmit}>
          <label>Título *</label>
          <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
          <label>Área *</label>
          <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} required />
          <label>Descrição</label>
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} />
          {erro && <p className="modal__erro">{erro}</p>}
          <div className="modal__acoes">
            <button type="button" className="btn-secundario" onClick={onFechar}>Cancelar</button>
            <button type="submit" className="btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FeedCard({ projeto, pesquisadores, onAtualizar }) {
  const { user } = useAuth();
  const [expandido, setExpandido] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState("");
  const [pesquisadorId, setPesquisadorId] = useState("");
  const [erro, setErro] = useState("");
  const [faseEditando, setFaseEditando] = useState(false);
  const [faseTexto, setFaseTexto] = useState(projeto.fase ?? "");
  const [erroFase, setErroFase] = useState("");
  const [editando, setEditando] = useState(false);

  const ehMembro = projeto.membros.includes(user._id);

  const membrosNomes = projeto.membros.map((id) => {
    const p = pesquisadores.find((p) => p._id === id);
    return p?.nomeCompleto ?? id;
  });

  const naoMembros = pesquisadores.filter((p) => !projeto.membros.includes(p._id));

  async function handleAdicionarMembro(e) {
    e.preventDefault();
    setErro("");
    try {
      await adicionarMembro(projeto._id, pesquisadorId);
      setPesquisadorId("");
      onAtualizar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleAdicionarAtividade(e) {
    e.preventDefault();
    if (!novaAtividade.trim()) return;
    try {
      await adicionarAtividade(projeto._id, novaAtividade.trim());
      setNovaAtividade("");
      onAtualizar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleRemoverAtividade(atividadeId) {
    try {
      await removerAtividade(projeto._id, atividadeId);
      onAtualizar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleExcluir() {
    if (!confirm(`Excluir o projeto "${projeto.titulo}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await excluirProjeto(projeto._id);
      onAtualizar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleSalvarFase() {
    setErroFase("");
    try {
      await atualizarFase(projeto._id, faseTexto.trim() || null);
      setFaseEditando(false);
      onAtualizar();
    } catch (err) {
      setErroFase(err.message);
    }
  }

  function handleFaseKeyDown(e) {
    if (e.key === "Enter" && e.ctrlKey) { e.preventDefault(); handleSalvarFase(); }
    if (e.key === "Escape") { setFaseTexto(projeto.fase ?? ""); setFaseEditando(false); setErroFase(""); }
  }

  function abrirEdicaoFase() {
    setFaseTexto(projeto.fase ?? "");
    setFaseEditando(true);
  }

  const inicial = projeto.titulo?.[0]?.toUpperCase() ?? "P";

  return (
    <>
    {editando && (
      <ModalEditarProjeto
        projeto={projeto}
        onSalvar={() => { setEditando(false); onAtualizar(); }}
        onFechar={() => setEditando(false)}
      />
    )}
    <article className="feed-card">
      <div className="feed-card__topo">
        <div className="feed-card__icone">{inicial}</div>

        <div className="feed-card__info">
          <div className="feed-card__header">
            <div className="feed-card__header-esq">
              <h3 className="feed-card__titulo">{projeto.titulo}</h3>
              <span className="feed-card__area">{projeto.area}</span>
              {ehMembro && (
                <div className="feed-card__acoes">
                  <button className="feed-card__acao-btn" onClick={() => setEditando(true)} title="Editar projeto">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="feed-card__acao-btn feed-card__acao-btn--danger" onClick={handleExcluir} title="Excluir projeto">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="feed-card__fase-wrap">
              {faseEditando ? (
                <div className="feed-card__fase-editor">
                  <textarea
                    className="feed-card__fase-textarea"
                    value={faseTexto}
                    onChange={(e) => setFaseTexto(e.target.value)}
                    onKeyDown={handleFaseKeyDown}
                    autoFocus
                    rows={2}
                    placeholder="Descreva a fase atual..."
                  />
                  {erroFase && <p className="modal__erro" style={{ margin: "2px 0 0" }}>{erroFase}</p>}
                  <div className="feed-card__fase-acoes">
                    <button className="btn-primary btn--xs" onClick={handleSalvarFase}>Confirmar</button>
                    <button className="btn-secundario btn--xs" onClick={() => { setFaseTexto(projeto.fase ?? ""); setFaseEditando(false); setErroFase(""); }}>Cancelar</button>
                  </div>
                </div>
              ) : projeto.fase ? (
                <div
                  className={`feed-card__fase feed-card__fase--preenchida${ehMembro ? " feed-card__fase--editavel" : ""}`}
                  onClick={ehMembro ? abrirEdicaoFase : undefined}
                >
                  <span>{projeto.fase}</span>
                  {ehMembro && (
                    <svg className="feed-card__fase-edit-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  )}
                </div>
              ) : ehMembro ? (
                <button className="feed-card__fase feed-card__fase--vazia" onClick={abrirEdicaoFase}>
                  + adicionar fase
                </button>
              ) : null}
            </div>
          </div>

          {projeto.descricao && (
            <p className="feed-card__desc">{projeto.descricao}</p>
          )}

          <div className="feed-card__membros">
            {membrosNomes.map((nome, i) => (
              <span key={i} className="feed-card__membro-chip">{nome}</span>
            ))}
            {ehMembro && naoMembros.length > 0 && (
              <form onSubmit={handleAdicionarMembro} className="feed-card__add-membro">
                <select value={pesquisadorId} onChange={(e) => setPesquisadorId(e.target.value)} required>
                  <option value="">+ Pesquisador</option>
                  {naoMembros.map((p) => (
                    <option key={p._id} value={p._id}>{p.nomeCompleto}</option>
                  ))}
                </select>
                <button type="submit" className="btn-primary btn--xs">Ok</button>
              </form>
            )}
          </div>
          {erro && <p className="modal__erro" style={{ marginTop: 4 }}>{erro}</p>}

          <button
            className="feed-card__expandir"
            onClick={() => setExpandido((v) => !v)}
          >
            {expandido ? "▲ Ocultar" : `▼ ${projeto.atividades.length} atividade${projeto.atividades.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>

      {expandido && (
        <div className="feed-card__timeline-wrap">
          {ehMembro && (
            <form onSubmit={handleAdicionarAtividade} className="feed-card__form-ativ">
              <input
                value={novaAtividade}
                onChange={(e) => setNovaAtividade(e.target.value)}
                placeholder="Registrar atividade..."
              />
              <button type="submit" className="btn-primary">+ Registrar</button>
            </form>
          )}

          {projeto.atividades.length === 0 ? (
            <p className="feed-card__vazio">Nenhuma atividade registrada.</p>
          ) : (
            <ul className="feed-card__timeline">
              {projeto.atividades.map((a) => (
                <li key={a._id} className="feed-card__atividade">
                  <div className="feed-card__ativ-trilho">
                    <div className="feed-card__ativ-dot" />
                  </div>
                  <div className="feed-card__ativ-conteudo">
                    <span className="feed-card__ativ-desc">{a.descricao}</span>
                    <div className="feed-card__ativ-rodape">
                      {a.autorNome && (
                        <span className="feed-card__ativ-autor">{a.autorNome}</span>
                      )}
                      <span className="feed-card__ativ-data">{formatarData(a.criadoEm)}</span>
                      {ehMembro && (
                        <button
                          className="feed-card__ativ-remover"
                          onClick={() => handleRemoverAtividade(a._id)}
                          title="Remover"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
    </>
  );
}

export default function ProjetosPesqColab() {
  const [projetos, setProjetos] = useState([]);
  const [pesquisadores, setPesquisadores] = useState([]);
  const [busca, setBusca] = useState("");
  const [criando, setCriando] = useState(false);

  async function carregar() {
    const [p, pesqs] = await Promise.all([listarProjetos("integrado"), getPesquisadores()]);
    setProjetos(p);
    setPesquisadores(pesqs);
  }

  useEffect(() => { carregar(); }, []);

  const filtrados = busca.trim()
    ? projetos.filter((p) => {
        const q = busca.toLowerCase();
        return (
          p.titulo.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.fase?.toLowerCase().includes(q) ||
          p.descricao?.toLowerCase().includes(q)
        );
      })
    : projetos;

  return (
    <div className="grafo-page">
      <PainelEsquerdo
        pesquisadores={pesquisadores}
        onPerfilAtualizado={carregar}
      />

      <div className="projetos-feed">
        <div className="projetos-feed__topo">
          <input
            className="projetos-feed__busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título ou área..."
          />
          <button className="btn-primary" onClick={() => setCriando(true)}>
            + Novo projeto
          </button>
        </div>

        <div className="projetos-feed__lista">
          {filtrados.length === 0 ? (
            <p className="projetos-feed__vazio">
              {busca ? "Nenhum projeto encontrado." : "Nenhum projeto ainda."}
            </p>
          ) : (
            filtrados.map((p) => (
              <FeedCard
                key={p._id}
                projeto={p}
                pesquisadores={pesquisadores}
                onAtualizar={carregar}
              />
            ))
          )}
        </div>
      </div>

      {criando && (
        <ModalNovoProjeto
          onSalvar={() => { setCriando(false); carregar(); }}
          onFechar={() => setCriando(false)}
        />
      )}
    </div>
  );
}

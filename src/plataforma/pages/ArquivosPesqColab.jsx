import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import GerenciadorArquivos from "../components/GerenciadorArquivos.jsx";
import { getPesquisadores } from "../services/pesquisadores.js";
import { normalizar } from "../utils/texto.js";

export default function ArquivosPesqColab() {
  const { user } = useAuth();
  const [pesquisadores, setPesquisadores] = useState([]);
  const [donoSelecionado, setDonoSelecionado] = useState(user._id);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getPesquisadores().then(setPesquisadores);
  }, []);

  const donoAtual = donoSelecionado === user._id
    ? { nomeCompleto: "Meu espaço" }
    : pesquisadores.find((p) => p._id === donoSelecionado);

  const filtrados = useMemo(() => {
    const t = normalizar(busca);
    return pesquisadores.filter((p) => p._id !== user._id && (!t || normalizar(p.nomeCompleto).includes(t)));
  }, [pesquisadores, busca, user._id]);

  return (
    <div className="arquivos-page">
      <aside className="arquivos-page__sidebar">
        <div className="arquivos-page__sidebar-header">
          <span>Espaços</span>
        </div>
        <div className="arquivos-page__sidebar-busca">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar pesquisador..."
          />
        </div>
        <ul>
          {!busca && (
          <li>
            <button
              className={`arquivos-page__sidebar-item ${donoSelecionado === user._id ? "active" : ""}`}
              onClick={() => setDonoSelecionado(user._id)}
            >
              <div className="arquivos-page__sidebar-avatar arquivos-page__sidebar-avatar--me">✦</div>
              <span>Meu espaço</span>
            </button>
          </li>
          )}
          {filtrados.map((p) => (
            <li key={p._id}>
              <button
                className={`arquivos-page__sidebar-item ${donoSelecionado === p._id ? "active" : ""}`}
                onClick={() => setDonoSelecionado(p._id)}
              >
                <div className="arquivos-page__sidebar-avatar">
                  {p.nomeCompleto?.[0]?.toUpperCase()}
                </div>
                <div className="arquivos-page__sidebar-info">
                  <span className="arquivos-page__sidebar-nome">{p.nomeCompleto}</span>
                  {p.universidade && (
                    <span className="arquivos-page__sidebar-univ">{p.universidade}</span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="arquivos-page__main">
        <div className="arquivos-page__main-header">
          <div className="arquivos-page__main-titulo">
            {donoAtual?.nomeCompleto ?? "Espaço de trabalho"}
          </div>
        </div>
        <GerenciadorArquivos
          donoId={donoSelecionado}
          isDono={donoSelecionado === user._id}
        />
      </main>
    </div>
  );
}

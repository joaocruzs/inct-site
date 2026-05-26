import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import PainelEsquerdo from "../components/PainelEsquerdo.jsx";
import PainelProjetos from "../components/PainelProjetos.jsx";
import GrafoControls from "../components/GrafoControls.jsx";
import ModalConexao from "../components/ModalConexao.jsx";
import { getGrafo, getGrafoPesquisador } from "../services/grafo.js";
import { getPesquisadores } from "../services/pesquisadores.js";

const GrafoViz = lazy(() => import("../components/GrafoViz.jsx"));

export default function GrafoPesqColab() {
  const { user } = useAuth();
  const graphRef = useRef(null);
  const [grafoData, setGrafoData] = useState({ nodes: [], links: [] });
  const [pesquisadores, setPesquisadores] = useState([]);
  const [modo, setModo] = useState("individual");
  const [pesquisadorSelecionado, setPesquisadorSelecionado] = useState(null);
  const [nodeProjetoClicado, setNodeProjetoClicado] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = useCallback(
    async (modoAtual) => {
      setLoading(true);
      try {
        const [grafo, pesquisadoresData] = await Promise.all([
          modoAtual === "integrado"
            ? getGrafo()
            : getGrafoPesquisador(user._id),
          getPesquisadores(),
        ]);
        setGrafoData(grafo);
        setPesquisadores(pesquisadoresData);
      } finally {
        setLoading(false);
      }
    },
    [user._id]
  );

  function handleNodeClick(node) {
    if (node.tipo === "projeto") {
      const membrosNomes = (node.membros ?? []).map((id) => {
        const p = pesquisadores.find((p) => p._id === id);
        return p?.nomeCompleto ?? id;
      });
      setNodeProjetoClicado({ ...node, membrosNomes });
    }
  }

  useEffect(() => {
    carregarDados(modo);
  }, [modo, carregarDados]);

  function handleToggleModo() {
    setModo((m) => (m === "integrado" ? "individual" : "integrado"));
  }

  function handleConexaoCriada() {
    setPesquisadorSelecionado(null);
    carregarDados(modo);
  }

  return (
    <div className="grafo-page">
      <PainelEsquerdo
        pesquisadores={pesquisadores}
        onSelecionarPesquisador={setPesquisadorSelecionado}
        onPerfilAtualizado={() => carregarDados(modo)}
      />

      <div className="grafo-page__central">
        {loading ? (
          <div className="grafo-page__loading">Carregando...</div>
        ) : (
          <Suspense fallback={<div className="grafo-page__loading">Carregando grafo...</div>}>
            <GrafoViz
              dados={grafoData}
              graphRef={graphRef}
              onNodeClick={handleNodeClick}
            />
          </Suspense>
        )}

        <GrafoControls
          modoIntegrado={modo === "integrado"}
          onToggleModo={handleToggleModo}
          onZoomIn={() => graphRef.current?.zoom(graphRef.current.zoom() * 1.3, 300)}
          onZoomOut={() => graphRef.current?.zoom(graphRef.current.zoom() * 0.7, 300)}
          onZoomReset={() => graphRef.current?.zoomToFit(1000, 60)}
        />
      </div>

      <PainelProjetos modo={modo} />

      {nodeProjetoClicado && (
        <div className="modal-overlay" onClick={() => setNodeProjetoClicado(null)}>
          <div className="modal modal--projeto" onClick={(e) => e.stopPropagation()}>
            <div className="modal__projeto-area">{nodeProjetoClicado.area}</div>
            <h3 className="modal__projeto-titulo">{nodeProjetoClicado.titulo}</h3>
            {nodeProjetoClicado.descricao && (
              <p className="modal__projeto-desc">{nodeProjetoClicado.descricao}</p>
            )}
            {nodeProjetoClicado.membrosNomes?.length > 0 && (
              <div className="modal__projeto-membros">
                <h4>Membros</h4>
                <ul>
                  {nodeProjetoClicado.membrosNomes.map((nome, i) => (
                    <li key={i}>{nome}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="modal__acoes">
              <button className="btn-primary" onClick={() => setNodeProjetoClicado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {pesquisadorSelecionado && (
        <ModalConexao
          pesquisadorB={pesquisadorSelecionado}
          onSalvar={handleConexaoCriada}
          onFechar={() => setPesquisadorSelecionado(null)}
        />
      )}
    </div>
  );
}

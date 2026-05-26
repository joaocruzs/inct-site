import { useEffect, useRef, useState, useCallback } from "react";
import {
  listarArquivos,
  criarPasta,
  getUrlVisualizacao,
  renomearArquivo,
  deletarArquivo,
} from "../services/arquivos.js";
import UploadArquivo from "./UploadArquivo.jsx";

function IconePasta() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  );
}

function IconeArquivo({ nome }) {
  const ext = nome?.split(".").pop()?.toLowerCase();
  const mapa = { pdf: "#e53935", doc: "#1565c0", docx: "#1565c0", xls: "#2e7d32", xlsx: "#2e7d32", png: "#6a1b9a", jpg: "#6a1b9a", jpeg: "#6a1b9a" };
  const cor = mapa[ext] ?? "#555";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function RenomearInput({ nome, onConfirmar, onCancelar }) {
  const ref = useRef(null);
  const [valor, setValor] = useState(nome);
  const submetido = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
    const ponto = nome.lastIndexOf(".");
    ref.current.setSelectionRange(0, ponto > 0 ? ponto : nome.length);
  }, []);

  function confirmar() {
    if (submetido.current) return;
    submetido.current = true;
    onConfirmar(valor.trim() || nome);
  }

  return (
    <input
      ref={ref}
      className="gerenciador__rename-input"
      value={valor}
      onChange={(e) => setValor(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") confirmar(); if (e.key === "Escape") onCancelar(); }}
      onBlur={confirmar}
    />
  );
}

export default function GerenciadorArquivos({ donoId, isDono }) {
  const [itens, setItens] = useState([]);
  const [pastaAtual, setPastaAtual] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [criandoPasta, setCriandoPasta] = useState(false);
  const [nomePasta, setNomePasta] = useState("");
  const [renomeandoId, setRenomeandoId] = useState(null);
  const operacaoEmAndamento = useRef(false);

  async function carregar(pastaId) {
    const data = await listarArquivos(donoId, pastaId);
    setItens(data);
  }

  useEffect(() => {
    setPastaAtual(null);
    setBreadcrumb([]);
    carregar(null);
  }, [donoId]);

  function entrarPasta(pasta) {
    setPastaAtual(pasta._id);
    setBreadcrumb((prev) => [...prev, pasta]);
    carregar(pasta._id);
  }

  function voltarPara(idx) {
    const novoBC = breadcrumb.slice(0, idx + 1);
    const pastaId = novoBC.at(-1)?._id ?? null;
    setBreadcrumb(novoBC);
    setPastaAtual(pastaId);
    carregar(pastaId);
  }

  function voltarRaiz() {
    setBreadcrumb([]);
    setPastaAtual(null);
    carregar(null);
  }

  async function handleCriarPasta(e) {
    e.preventDefault();
    await criarPasta({ nome: nomePasta, pastaId: pastaAtual });
    setNomePasta("");
    setCriandoPasta(false);
    carregar(pastaAtual);
  }

  const confirmarRenome = useCallback((item, novoNome) => {
    setRenomeandoId(null);
    if (novoNome === item.nome || operacaoEmAndamento.current) return;
    operacaoEmAndamento.current = true;
    renomearArquivo(item._id, novoNome)
      .then(() => carregar(pastaAtual))
      .finally(() => { operacaoEmAndamento.current = false; });
  }, [pastaAtual]);

  const pastas = itens.filter((i) => i.tipo === "pasta");
  const arquivos = itens.filter((i) => i.tipo !== "pasta");

  return (
    <div className="gerenciador">
      <div className="gerenciador__breadcrumb">
        {breadcrumb.length > 0 && (
          <button
            className="gerenciador__breadcrumb-voltar"
            onClick={() => breadcrumb.length === 1 ? voltarRaiz() : voltarPara(breadcrumb.length - 2)}
            title="Voltar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}
        <button className="gerenciador__breadcrumb-raiz" onClick={voltarRaiz} title="Raiz">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Raiz
        </button>
        {breadcrumb.map((pasta, idx) => (
          <span key={pasta._id}>
            <span className="gerenciador__breadcrumb-sep">/</span>
            <button onClick={() => voltarPara(idx)}>{pasta.nome}</button>
          </span>
        ))}
      </div>

      {isDono && (
        <div className="gerenciador__acoes">
          <UploadArquivo pastaId={pastaAtual} onUpload={() => carregar(pastaAtual)} />
          <button className="btn-secundario" onClick={() => setCriandoPasta(true)}>
            + Nova pasta
          </button>
        </div>
      )}

      {criandoPasta && (
        <form onSubmit={handleCriarPasta} className="gerenciador__nova-pasta">
          <input
            value={nomePasta}
            onChange={(e) => setNomePasta(e.target.value)}
            placeholder="Nome da pasta"
            required
            autoFocus
          />
          <button type="submit" className="btn-primary">Criar</button>
          <button type="button" className="btn-secundario" onClick={() => setCriandoPasta(false)}>Cancelar</button>
        </form>
      )}

      {itens.length === 0 ? (
        <div className="gerenciador__vazio">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
          <span>Pasta vazia</span>
        </div>
      ) : (
        <>
          {pastas.length > 0 && (
            <div className="gerenciador__secao">
              <div className="gerenciador__secao-titulo">Pastas</div>
              <ul className="gerenciador__grid">
                {pastas.map((item) => (
                  <ItemArquivo key={item._id} item={item} isDono={isDono} renomeandoId={renomeandoId}
                    onEntrar={entrarPasta}
                    onRenomear={setRenomeandoId}
                    onConfirmarRenome={(novoNome) => confirmarRenome(item, novoNome)}
                    onCancelarRenome={() => setRenomeandoId(null)}
                    onDeletar={async () => { if (!confirm(`Excluir "${item.nome}"?`)) return; await deletarArquivo(item._id); carregar(pastaAtual); }}
                  />
                ))}
              </ul>
            </div>
          )}
          {arquivos.length > 0 && (
            <div className="gerenciador__secao">
              <div className="gerenciador__secao-titulo">Arquivos</div>
              <ul className="gerenciador__grid">
                {arquivos.map((item) => (
                  <ItemArquivo key={item._id} item={item} isDono={isDono} renomeandoId={renomeandoId}
                    onVisualizar={async () => { const url = await getUrlVisualizacao(item._id); window.open(url, "_blank"); }}
                    onRenomear={setRenomeandoId}
                    onConfirmarRenome={(novoNome) => confirmarRenome(item, novoNome)}
                    onCancelarRenome={() => setRenomeandoId(null)}
                    onDeletar={async () => { if (!confirm(`Excluir "${item.nome}"?`)) return; await deletarArquivo(item._id); carregar(pastaAtual); }}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ItemArquivo({ item, isDono, renomeandoId, onEntrar, onVisualizar, onRenomear, onConfirmarRenome, onCancelarRenome, onDeletar }) {
  const isPasta = item.tipo === "pasta";

  return (
    <li className="gerenciador__item">
      <div className={`gerenciador__item-icone ${isPasta ? "gerenciador__item-icone--pasta" : "gerenciador__item-icone--arquivo"}`}>
        {isPasta ? <IconePasta /> : <IconeArquivo nome={item.nome} />}
      </div>

      <div className="gerenciador__item-corpo">
        {renomeandoId === item._id ? (
          <RenomearInput nome={item.nome} onConfirmar={onConfirmarRenome} onCancelar={onCancelarRenome} />
        ) : (
          <button
            className="gerenciador__item-nome"
            onClick={isPasta ? () => onEntrar(item) : onVisualizar}
          >
            {item.nome}
          </button>
        )}
      </div>

      {isDono && renomeandoId !== item._id && (
        <div className="gerenciador__item-acoes">
          <button className="gerenciador__item-btn" onClick={() => onRenomear(item._id)} title="Renomear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="gerenciador__item-btn gerenciador__item-btn--danger" onClick={onDeletar} title="Excluir">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}

import { useState } from "react";
import { criarConexao } from "../services/conexoes.js";

export default function ModalConexao({ pesquisadores = [], pesquisadorB = null, onSalvar, onFechar }) {
  const [pesquisadorBId, setPesquisadorBId] = useState(pesquisadorB?._id ?? "");
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await criarConexao({ pesquisadorBId, area, descricao: descricao || null });
      onSalvar();
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Nova conexão</h3>
        <form onSubmit={handleSubmit}>
          <label>Pesquisador *</label>
          {pesquisadorB ? (
            <input value={pesquisadorB.nomeCompleto} disabled />
          ) : (
            <select
              value={pesquisadorBId}
              onChange={(e) => setPesquisadorBId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {pesquisadores.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nomeCompleto} — {p.universidade}
                </option>
              ))}
            </select>
          )}

          <label>Área *</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Ex: Oncologia, Genômica..."
            required
          />

          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Opcional"
            rows={3}
          />

          {erro && <p className="modal__erro">{erro}</p>}

          <div className="modal__acoes">
            <button type="button" className="btn-secundario" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={carregando}>
              {carregando ? "Criando..." : "Criar conexão"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

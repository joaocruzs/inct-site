import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { updateMe } from "../services/pesquisadores.js";

export default function ResumoPanel({ onFechar }) {
  const { user } = useAuth();
  const [resumo, setResumo] = useState(user?.resumo ?? "");
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    setSalvando(true);
    try {
      await updateMe({ resumo: resumo || null });
      onFechar();
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="resumo-panel">
      <div className="resumo-panel__header">
        <span>Resumo de Atuação</span>
        <button onClick={onFechar}>×</button>
      </div>
      <textarea
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
        maxLength={200}
        rows={5}
        placeholder="Descreva sua atuação..."
      />
      <div className="resumo-panel__footer">
        <span>{resumo.length}/200</span>
        <button className="btn-primary" onClick={handleSalvar} disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}

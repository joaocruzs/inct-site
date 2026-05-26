import { useEffect, useState } from "react";
import { listarProjetos } from "../services/projetos.js";

export default function PainelProjetos({ modo = "individual" }) {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    listarProjetos(modo).then(setProjetos);
  }, [modo]);

  const filtrados = busca.trim()
    ? projetos.filter((p) =>
        p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        p.area.toLowerCase().includes(busca.toLowerCase())
      )
    : projetos;

  return (
    <aside className="painel-projetos">
      <div className="painel-projetos__cabecalho">
        <h2 className="painel-projetos__titulo">Projetos</h2>
      </div>

      <div style={{ padding: "8px 12px" }}>
        <input
          className="painel-projetos__busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar projeto..."
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="painel-projetos__vazio">
          {busca ? "Nenhum resultado." : "Nenhum projeto ainda."}
        </p>
      ) : (
        <ul className="painel-projetos__lista">
          {filtrados.map((p) => (
            <li key={p._id} className="painel-projetos__item">
              <div className="painel-projetos__par">{p.titulo}</div>
              <span className="painel-projetos__area">{p.area}</span>
              {p.descricao && (
                <p className="painel-projetos__desc">{p.descricao}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

import equipe from "../data/equipe.json";
import Section from "../components/Section";
import CardMembro from "../components/CardMembro";
import { useRef, useEffect, useState } from "react";

export default function Equipe() {
  const grupos = equipe.reduce((acc, membro) => {
    const cat = membro.categoria || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(membro);
    return acc;
  }, {});

  const categoriasOrdenadas = Object.keys(grupos).sort().reverse();

  const refs = categoriasOrdenadas.reduce((acc, cat) => {
    acc[cat] = useRef(null);
    return acc;
  }, {});

  const scrollTo = (categoria) => {
    refs[categoria].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // contador animado
  const [counts, setCounts] = useState({});
  useEffect(() => {
    const updated = {};

    categoriasOrdenadas.forEach((cat) => {
      let start = 0;
      const end = grupos[cat].length;
      const duration = 800;
      const step = Math.max(Math.floor(duration / end), 20);

      const timer = setInterval(() => {
        start++;
        updated[cat] = start;
        setCounts({ ...updated });

        if (start >= end) clearInterval(timer);
      }, step);
    });
  }, []);

  return (
    <div>
      {/* ===================== MURAL HERO ===================== */}
      <div className="mural-categorias">
        <img src="/imagens/banner.gif" className="mural-bg" alt="" />

        <div className="mural-container">
          {categoriasOrdenadas.map((categoria, index) => (
            <div
              key={index}
              className="mural-card"
              onClick={() => scrollTo(categoria)}
            >
              <h3>{categoria}</h3>
              <span className="mural-num">{counts[categoria] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== SEÇÕES DOS GRUPOS ===================== */}
      {categoriasOrdenadas.map((categoria, index) => (
        <div key={index} ref={refs[categoria]}>
          <Section title={categoria}>
            <div className="membros-grid">
              {grupos[categoria].map((m, i) => (
                <CardMembro
                  key={i}
                  nome={m.nome}
                  formacao={m.formacao}
                  instituicao={m.instituicao}
                  areas={m.areas}
                  lattes={m.lattes}
                  imagem={m.imagem}
                />
              ))}
            </div>
          </Section>
        </div>
      ))}
    </div>
  );
}

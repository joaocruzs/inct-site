import parceiros from "../data/parceiros.json";
import Section from "../components/Section";
import CardParceiro from "../components/CardParceiro";
import { useRef, useEffect, useState } from "react";

export default function Parceiros() {
  const grupos = parceiros.reduce((acc, parceiro) => {
    const cat = parceiro.categoria || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(parceiro);
    return acc;
  }, {});

  // refs das seções
  const refs = Object.keys(grupos).reduce((acc, cat) => {
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
    Object.keys(grupos).forEach((cat) => {
      let start = 0;
      const end = grupos[cat].length;
      const duration = 800;
      const step = Math.max(Math.floor(duration / end), 25);

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

      {/* 1. MURAL */}
      <div className="mural">
        <img src="banners/banner.gif" className="mural-img" alt="" />

        <div className="mural-container mural-wrap">
          {Object.keys(grupos).map((categoria, index) => (
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

      {/* 2. SEÇÕES DOS GRUPOS */}
      {Object.keys(grupos).map((categoria, index) => (
        <div key={index} ref={refs[categoria]}>
          <Section title={categoria}>
            <div className="membros-grid">
              {grupos[categoria].map((m, i) => (
                <CardParceiro
                  key={i}
                  nome={m.nome}
                  descricao={m.descricao}
                  imagem={m.imagem}
                  link={m.link}
                />
              ))}
            </div>
          </Section>
        </div>
      ))}
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import Section from "../components/general/Section";
import CardPesquisador from "../components/cards/CardPesquisador";

import equipe from "../data/pesquisadores.json";

export default function Pesquisadores() {
  const grupos = equipe.reduce((acc, pesquisador) => {
    const cat = pesquisador.categoria || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(pesquisador);
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
      {/* 1. MURAL */}
      <div className="mural">
        <img src="banners/banner.gif" className="mural-img" alt="" />

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

      {/* 2. SEÇÕES DOS GRUPOS */}
      {categoriasOrdenadas.map((categoria, index) => (
        <div key={index} ref={refs[categoria]}>
          <Section title={categoria}>
            <div className="grid-pesquisadores">
              {grupos[categoria].map((p, i) => (
                <CardPesquisador
                  key={i}
                  nome={p.nome}
                  formacao={p.formacao}
                  instituicao={p.instituicao}
                  areas={p.areas}
                  link={p.link}
                  imagem={p.imagem}
                  email={p.email}
                />
              ))}
            </div>
          </Section>
        </div>
      ))}
    </div>
  );
}

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

  // REFERÊNCIA DO CARROSSEL
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // ANIMAÇÃO DOS CONTADORES
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const animated = {};
    Object.keys(grupos).forEach((cat) => {
      let start = 0;
      const end = grupos[cat].length;
      const duration = 600;
      const stepTime = Math.max(Math.floor(duration / end), 20);

      const timer = setInterval(() => {
        start++;
        animated[cat] = start;
        setCounts({ ...animated });

        if (start >= end) clearInterval(timer);
      }, stepTime);
    });
  }, []);

  return (
    <div>

      {/* ======== CARROSSEL ========= */}
      <div className="categoria-carousel-container">

        <button className="carousel-btn left" onClick={scrollLeft}>❮</button>
        <button className="carousel-btn right" onClick={scrollRight}>❯</button>

        <div className="categoria-carousel-mini" ref={sliderRef}>
          {Object.keys(grupos).map((categoria, index) => (
            <div
              key={index}
              className={`categoria-mini-card categoria-${categoria.replace(/\s+/g, "")}`}
              onClick={() => scrollTo(categoria)}
            >
              <h4>{categoria}</h4>
              <span className="categoria-mini-num">{counts[categoria] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ======== SEÇÕES ========= */}
      {Object.keys(grupos).map((categoria, index) => (
        <div key={index} ref={refs[categoria]}>
          <Section title={categoria}>
            <div className="membros-grid">
              {grupos[categoria].map((m, i) => (
                <CardMembro
                  key={i}
                  nome={m.nome}
                  formacao={m.formacao}
                  nivel={m.nivel}
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

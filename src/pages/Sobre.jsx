import { useState } from "react";
import { Link } from "react-router-dom";
import sobre from "../data/sobre.json";
import Section from "../components/Section";

export default function Sobre() {
  const [aberto, setAberto] = useState(null);

  function toggle(index) {
    setAberto(aberto === index ? null : index);
  }

  return (
    <div>
      {/* ===================== MURAL HERO ===================== */}
      <div className="mural-categorias">
        <img
          src="banners/banner.gif"
          className="mural-bg"
          alt="Banner institucional"
        />

        <div className="mural-container">
          <Link to="/publicacoes" className="mural-card">
            <span className="mural-num">Publicações</span>
          </Link>

          <Link to="/noticias" className="mural-card">
            <span className="mural-num">Notícias</span>
          </Link>

          <Link to="/galeria" className="mural-card">
            <span className="mural-num">Eventos</span>
          </Link>
        </div>
      </div>

      {/* ===================== CONTEÚDO ===================== */}
      <Section title="Sobre o Instituto">
        {/* Texto institucional */}
        <div className="prose max-w-none mb-12">
          {sobre.paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Accordion / Conceitos */}
        <div className="accordion">
          {sobre.definicoes.map((item, i) => {
            const isOpen = aberto === i;

            return (
              <div
                key={i}
                className={`accordion-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.titulo}</span>
                  <span className="accordion-icon">
                    {isOpen ? "▾" : "▸"}
                  </span>
                </button>

                <div className="accordion-content">
                  <p>{item.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

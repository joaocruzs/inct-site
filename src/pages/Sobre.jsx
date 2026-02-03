import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";

import sobre from "../data/sobre.json";

export default function Sobre() {
  const [abertos, setAbertos] = useState([]);

  function toggle(index) {
    setAbertos((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]               
    );
  }

  return (
    <div>
      {/* 1. MURAL */}
      <div className="mural">
        <img
          src="banners/banner.gif"
          className="mural-img"
          alt="Banner institucional"
        />

        <div className="mural-container">
          <Link to="/publicacoes" className="mural-card">
            <span className="mural-num">Publicações</span>
          </Link>

          <Link to="/noticias" className="mural-card">
            <span className="mural-num">Notícias</span>
          </Link>

          <Link to="/eventos" className="mural-card">
            <span className="mural-num">Eventos</span>
          </Link>
        </div>
      </div>

      {/* 2. SOBRE O INSTITUTO */}
      <Section title="Sobre o Instituto">
        <div className="split-about"> 
          <div className="prose max-w-none mb-12">
            {sobre.paragrafos.map((p, i) => (<p key={i}>{p}</p>))}
          </div>
          <div><img src="banners/parceiros.png" /> </div>
        </div>

        {/* 3. CONCEITOS */}
        <div className="faq">
          {sobre.definicoes.map((item, i) => {
            const isOpen = abertos.includes(i);

            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-header"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-titulo">{item.titulo}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                <div className="faq-content">
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
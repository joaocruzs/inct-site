import { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import Section from "../components/Section";
import CardNoticia from "../components/CardNoticia";
import noticias from "../data/noticias.json";

export default function Home() {
  const [index, setIndex] = useState(0);
  const total = noticias.length;

  useEffect(() => {
    if (!total) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [total]);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <>
      {/* Hero */}
      <HeroBanner
        imagem="banners/banner.gif"
        titulo="Inovação e Avanços na Oncologia"
        subtitulo="Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia."
        botaotexto="Saiba mais"
        botaolink={"/sobre" || pathname === "/#/sobre" || pathname === "/inct-site/#/sobre"} 
      />

      {/* Instituto */}
      <Section title="O Instituto">
        <p>
          O INCT OncottGen é dedicado ao desenvolvimento de tecnologias inovadoras
          em oncologia, com foco em terapias gênicas, siRNA, CRISPR e pesquisas
          translacionais.
        </p>
      </Section>

      {/* Últimas Notícias */}
      <Section title="Últimas Notícias">
        <div className="news-carousel">
          <button className="carousel-nav left" onClick={prev}>
            ‹
          </button>

          <div className="carousel-window">
            <div
              className="home-carousel-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {noticias.map((n, i) => (
                <div className="carousel-slide" key={i}>
                  <CardNoticia {...n} />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-nav right" onClick={next}>
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {noticias.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </Section>

      {/* Plataforma externa */}
      <Section>
        <div className="split-section">
          <img src="banners/equipe.png" alt="" />

          <div className="split-text">
            <h3>Plataforma de Dados Científicos</h3>
            <p>
              Acesse nossa plataforma integrada.
            </p>
            <a
              href="https://oncottgenpesq.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Acessar plataforma
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
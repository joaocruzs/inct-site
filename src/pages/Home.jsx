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
        botaolink={"/sobre"} 
      />
      
      {/* Plataforma externa */}
      <Section>
        <div className="split-section">
          <img src="banners/background.jpg" alt="" />

          <div className="split-text">
            <h3>Plataforma de Colaboração para Membros</h3>
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

      {/* Instituto */}
      <Section title="O Instituto">
        <div className="prose">
        <p>
          O Instituto Nacional de Ciência e Tecnologia de Oncologia Translacional e Terapias Gênicas (INCT-OncoTTGen) é uma rede nacional e internacional dedicada ao desenvolvimento de soluções inovadoras para o diagnóstico e tratamento do câncer, com foco especial nos tumores que acometem o sistema nervoso central.
          O Instituto integra pesquisa de ponta, formação de recursos humanos e inovação tecnológica para transformar descobertas científicas em benefícios reais para pacientes e para o Sistema Único de Saúde.
          Dedica-se ao desenvolvimento de tecnologias inovadoras em oncologia, com foco em terapias gênicas, siRNA, CRISPR e pesquisas translacionais.
        </p>
        </div>
      </Section>

      {/* Plataforma externa */}
      <Section>
        <div className="split-section">
          <img src="banners/background.jpg" alt="" />

          <div className="split-text">
            <h3>Plataforma de Colaboração para Membros</h3>
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
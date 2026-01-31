import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import CardNoticia from "../components/CardNoticia";
import { FaExternalLinkAlt } from "react-icons/fa";
import noticias from "../data/noticias.json"; // a inserir últimas notícias

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
      {/* 1. BANNER */}
      <section className="banner">
        <img src="banners/banner.gif" className="banner-img" />
        <div className="banner-content container">
          <h1>Inovação e Avanços na Oncologia</h1>
          <p>Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia.</p>
          <Link to="/sobre" className="banner-button">Saiba Mais</Link>
        </div>
      </section>
      
      {/* 2. PLATAFORMA EXTERNA */}
      <Section>
        <div className="split">
          <Link to="/plataforma">
            <img src="banners/background.jpg"/>
          </Link>

          <div className="split-text">
            <Link to="/plataforma"><h3>Plataforma de Colaboração para Membros</h3></Link>
            <a 
              href="https://oncottgenpesq.vercel.app"
              target="_blank"
              rel="noreferrer">
                Acessar plataforma <FaExternalLinkAlt />
              </a>
          </div>
        </div>
      </Section>

      {/* 3. ÚLTIMAS NOTÍCIAS */}
      <Section title="Últimas Notícias">
        <div className="carrossel-news">
          <button className="carrossel-nav" onClick={prev}> ‹ </button>
          <div className="carrossel-window">
            <div className="carrossel-track" style={{transform: `translateX(-${index * 100}%)` }}>
              {noticias.map((n, i) => (
                <div className="carrossel-slide" key={i}>
                  <CardNoticia {...n} />
                </div>))}
            </div>
          </div>
          <button className="carrossel-nav" onClick={next}> › </button>
        </div>

        <div className="carrossel-dots">
          {noticias.map((_, i) => (
            <span key={i} 
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}/>))}
        </div>
      </Section>

      {/* 4. APRESENTAÇÃO DO INSTITUTO */}
      <Section title="O Instituto">
        <div className="prose">
        <p>
          O Instituto Nacional de Ciência e Tecnologia de Oncologia Translacional e Terapias Gênicas (INCT-OncoTTGen) é uma rede nacional e internacional dedicada ao desenvolvimento de soluções inovadoras para o diagnóstico e tratamento do câncer, com foco especial nos tumores que acometem o sistema nervoso central.
          O Instituto dedica-se ao desenvolvimento de tecnologias inovadoras em oncologia, com foco em terapias gênicas, siRNA, CRISPR e pesquisas translacionais, integrando pesquisa de ponta, formação de recursos humanos e inovação tecnológica para transformar descobertas científicas em benefícios reais para pacientes e para o Sistema Único de Saúde.
        </p>
        </div>
      </Section>

      {/* 5. PLATAFORMA EXTERNA */}
      <Section>
        <div className="split">
          <Link to="/plataforma">
            <img src="banners/background.jpg"/>
          </Link>

          <div className="split-text">
            <Link to="/plataforma"><h3>Plataforma de Colaboração para Membros</h3></Link>
            <a 
              href="https://oncottgenpesq.vercel.app"
              target="_blank"
              rel="noreferrer">
                Acessar plataforma <FaExternalLinkAlt />
              </a>
          </div>
        </div>
      </Section>
    </>
  );
}
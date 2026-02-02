import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import CardNoticiaHome from "../components/noticias/CardNoticiaHome";
import PublicacaoListItem from "../components/publicacoes/PublicacaoListItem";
import { FaExternalLinkAlt } from "react-icons/fa";

import noticias from "../data/noticias.json";
import publicacoes from "../data/publicacoes.json";
import destaques from "../data/destaques.json";

export default function Home() {
  /* CARROSSEL DE DESTAQUES */
  const [index, setIndex] = useState(0);
  const total = destaques.length;

  useEffect(() => {
    if (!total) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % total),
      7000
    );
    return () => clearInterval(timer);
  }, [total]);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  /* DADOS */
  const ultimasNoticias = noticias.slice(0, 8);
  const ultimasPublicacoes = publicacoes.slice(0, 8);

  return (
    <>
      {/* 1. HERO */}
      <section className="banner">
        <img src="banners/banner.gif" className="banner-img" alt="" />
        <div className="banner-content container">
          <h1>Inovação e Avanços na Oncologia</h1>
          <p>Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia.</p>
          <Link to="/sobre" className="banner-button">
            Saiba Mais
          </Link>
        </div>
      </section>

      {/* 2. CARROSSEL DE DESTAQUES */}
      <Section>
        <div className="carrossel-destaques">
          <button className="carrossel-nav" onClick={prev}>‹</button>

          <div className="carrossel-window">
            <div
              className="carrossel-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {destaques.map((item, i) => (
                <div className="carrossel-slide destaque" key={i}>
                  <img src={item.imagem} alt="" />
                  <div className="destaque-content">
                    <h3>{item.titulo}</h3>
                    {item.subtitulo && <p>{item.subtitulo}</p>}

                    {item.link && (
                      item.externo ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          Acessar <FaExternalLinkAlt />
                        </a>
                      ) : (
                        <Link to={item.link}>Saiba mais</Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carrossel-nav" onClick={next}>›</button>
        </div>
      </Section>

      {/* 3. ÚLTIMAS NOTÍCIAS */}
      <Section title="Últimas Notícias">
        <div className="news-grid">
          {ultimasNoticias.map((n, i) => (
            <CardNoticiaHome key={i} {...n} />
          ))}
        </div>

        <div className="section-action">
          <Link to="/noticias">Ver todas as notícias</Link>
        </div>
      </Section>

      {/* 4. ÚLTIMAS PUBLICAÇÕES */}
      <Section title="Publicações">
        <div className="publicacoes-grid">
          {ultimasPublicacoes.map((p, i) => (
            <PublicacaoListItem key={i} {...p} />
          ))}
        </div>

        <div className="section-action">
          <Link to="/publicacoes">Ver todas as publicações</Link>
        </div>
      </Section>
    </>
  );
}

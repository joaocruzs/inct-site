import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";
import CardNoticia from "../components/cards/CardNoticia";
import ListaPublicacao from "../components/lists/ListaPublicacao";
import { FaExternalLinkAlt } from "react-icons/fa";

import noticias from "../data/noticias.json";
import { getPublicacoes } from "../services/publicacoes.service";
import destaques from "../data/destaques.json";

export default function Home() {
  /* Serviço 1 - Carrossel de Destaques */
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

  /* Serviço 2 - Últimas Notícias */
  const ultimasNoticias = noticias.slice(0, 8);

  /* Serviço 3 - Últimas Publicações */
  const [publicacoes, setPublicacoes] = useState([]);
  const [loadingPublicacoes, setLoadingPublicacoes] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPublicacoes()
      .then((data) => {
        const ordenadas = [...data].sort((a, b) => b.ano - a.ano);
        setPublicacoes(ordenadas.slice(0, 4));
      })
      .catch(() => setErro(true))
      .finally(() => setLoadingPublicacoes(false));
  }, []);

  return (
    <>
      {/* 1. BANNER */}
      <section className="banner">
        <img src="banners/banner.gif" className="banner-img" />
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
          <div className="carrossel-window">
            <div
              className="carrossel-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {destaques.map((item, i) => (
                <div className="carrossel-slide destaque" key={i}>
                  <img src={item.imagem}/>

                  <div className="destaque-content">
                    <h3>{item.titulo}</h3>
                    {item.subtitulo && <p>{item.subtitulo}</p>}

                    {item.link &&
                      (item.externo ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          Acessar <FaExternalLinkAlt />
                        </a>
                      ) : (
                        <Link to={item.link}>Saiba mais</Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carrossel-controls">
            <button onClick={prev} className="carrossel-arrow">‹</button>

            <div className="carrossel-dots">
              {destaques.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>

            <button onClick={next} className="carrossel-arrow">›</button>
          </div>
        </div>

      </Section>

      {/* 3. ÚLTIMAS NOTÍCIAS */}
      <Section title="Últimas Notícias">
        <div className="news-grid">
          {ultimasNoticias.map((n, i) => (
            <CardNoticia key={i} {...n} />
          ))}
        </div>

        <div className="section-action">
          <Link to="/noticias">Ver todas as notícias</Link>
        </div>
      </Section>

      {/* 4. ÚLTIMAS PUBLICAÇÕES */}
    <Section title="Publicações">
      {loadingPublicacoes && <p>Carregando publicações...</p>}
      {erro && <p>Erro ao carregar publicações.</p>}

      <div className="publicacoes-grid">
        {publicacoes.map((p) => (
          <ListaPublicacao key={p._id} {...p} />
        ))}
      </div>

      <div className="section-action">
        <Link to="/publicacoes">Ver todas as publicações</Link>
      </div>
    </Section>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";
import CardNoticia from "../components/cards/CardNoticia";
import ListaPublicacao from "../components/lists/ListaPublicacao";
import { FaExternalLinkAlt } from "react-icons/fa";

import { getNoticias } from "../services/noticias.service";
import { getArtigos } from "../services/artigos.service";
import { getCursosPublicados } from "../services/cursos.service";
import destaques from "../data/destaques.json";

export default function Home() {
  /* 1. ÚLTIMAS NOTÍCIAS */
  const [noticias, setNoticias] = useState([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);
  const [erroNoticias, setErroNoticias] = useState(false);

  useEffect(() => {
    getNoticias()
      .then((data) => {
        const ordenadas = [...data].sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticias(ordenadas.slice(0, 4));
      })
      .catch(() => setErroNoticias(true))
      .finally(() => setLoadingNoticias(false));
  }, []);

  /* 2. CARREGAMENTO DO WIDGET BEHOLD */
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://w.behold.so/widget.js"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
  }, []);

  /* 3. ÚLTIMAS PUBLICAÇÕES */
  const [publicacoes, setPublicacoes] = useState([]);
  const [loadingPublicacoes, setLoadingPublicacoes] = useState(true);
  const [erroPublicacoes, setErroPublicacoes] = useState(false);

  useEffect(() => {
    getArtigos()
      .then((data) => {
        const ordenadas = [...data].sort((a, b) => b.ano - a.ano);
        setPublicacoes(ordenadas.slice(0, 8));
      })
      .catch(() => setErroPublicacoes(true))
      .finally(() => setLoadingPublicacoes(false));
  }, []);

  /* 4. CURSOS */
  const [cursos, setCursos] = useState([]);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    getCursosPublicados()
      .then(setCursos)
      .catch(() => {});
  }, []);

  function onMouseDown(e) {
    isDragging.current  = true;
    startX.current      = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current  = trackRef.current.scrollLeft;
  }
  function onMouseMove(e) {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }
  function onMouseUp() { isDragging.current = false; }

  /* 5. CARROSSEL DE DESTAQUES */
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

  return (
    <>
      {/* 1. HERO */}
      <section className="banner">
        <img src="banners/banner.gif" className="banner-img" alt="" />
        <div className="banner-content container">
          <Link to="/apoio"> <img src="apoio.png" alt="" className="banner-logo" /> </Link>
          <h1>Inovação e Avanços em Oncologia</h1>
          <p>Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia.</p>
          <Link to="/sobre" className="banner-button"> Saiba Mais </Link>
        </div>
      </section>

      {/* 2. ÚLTIMAS NOTÍCIAS */}
      <Section title="Últimas Notícias">
        {loadingNoticias && <p>Carregando notícias...</p>}
        {erroNoticias && <p>Erro ao carregar notícias.</p>}

        <div className="news-grid">
          {noticias.map((n) => (
            <CardNoticia key={n._id} {...n} />
          ))}
        </div>

        <div className="section-action">
          <Link to="/noticias">Ver todas as notícias</Link>
        </div>
      </Section>

      {/* 3. FEED SOCIAL */}
      <Section title="Mais recentes no Feed">
        <div className="behold-container">
          <behold-widget feed-id="xcpomBbDoQRWf24Momyt"></behold-widget>
        </div>
      </Section>

      {/* 4. ÚLTIMAS PUBLICAÇÕES */}
      <Section title="Artigos Publicados">
        {loadingPublicacoes && <p>Carregando publicações...</p>}
        {erroPublicacoes && <p>Erro ao carregar publicações.</p>}
        <div className="publicacoes-grid">
          {publicacoes.map((p) => (
            <ListaPublicacao key={p._id} {...p} />
          ))}
        </div>

        <div className="section-action">
          <Link to="/publicacoes">Ver todas as publicações</Link>
        </div>
      </Section>

      {/* 5. CURSOS */}
      {cursos.length > 0 && (
        <Section>
          <div className="cursos-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Cursos</h2>
            <Link to="/cursos" className="cursos-ver-todos">Ver todos →</Link>
          </div>

          <div
            className="cursos-scroll-track"
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {cursos.map((c) => (
              <Link key={c._id} to={`/cursos/${c._id}`} className="card-curso">
                {c.imagem && (
                  <img src={c.imagem} alt={c.titulo} className="card-curso-img" />
                )}
                <div className="card-curso-info">
                  <p className="card-curso-titulo">{c.titulo}</p>
                  {c.tags.length > 0 && (
                    <div className="card-curso-tags">
                      {c.tags.slice(0, 2).map((t) => (
                        <span key={t} className="card-curso-tag">{t}</span>
                      ))}
                    </div>
                  )}
                  <span className="card-curso-modulos">
                    {c.modulos.length} módulo{c.modulos.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* 6. CARROSSEL DE DESTAQUES */}
      <Section>
        <div className="carrossel-destaques">
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
    </>
  );
}

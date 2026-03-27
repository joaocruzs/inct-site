import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";
import CardNoticia from "../components/cards/CardNoticia";
import ListaPublicacao from "../components/lists/ListaPublicacao";
import { FaYoutube, FaInstagram, FaLinkedin, FaUserFriends } from "react-icons/fa";

import { getNoticias } from "../services/noticias.service";
import { getArtigos } from "../services/artigos.service";

export default function Home() {
  /* 1. CARREGAMENTO DO WIDGET BEHOLD */
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://w.behold.so/widget.js"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
  }, []);

  /* 2. ÚLTIMAS NOTÍCIAS */
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

  return (
    <>
      {/* 1. HERO */}
      <section className="banner">
        <img src="imagens/banners/banner.gif" className="banner-img" alt="" />
        <div className="banner-content container">
          <img src="imagens/banners/apoio.png" alt="" className="banner-logo" />
          <h1>Inovação e Avanços em Oncologia</h1>
          <p>Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia.</p>
          <Link to="/sobre" className="banner-button"> Saiba Mais </Link>
        </div>
      </section>

      {/* 2. FEED SOCIAL */}
      <Section title="Mais recentes no Feed">
        <div>
          <behold-widget feed-id="xcpomBbDoQRWf24Momyt"></behold-widget>
        </div>
      </Section>

      {/* 3. ÚLTIMAS NOTÍCIAS */}
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
          <Link to="/artigos">Ver todos os Artigos</Link>
        </div>
      </Section>
    </>
  );
}

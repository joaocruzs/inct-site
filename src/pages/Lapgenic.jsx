import { useRef } from "react";
import Section from "../components/general/Section";
import CardPesquisador from "../components/cards/CardPesquisador";
import equipe from "../data/pesquisadores.json";

/* PÁGINA 7 -- LAPGENIC */

export default function Lapgenic() {
  const refApresentacao = useRef(null);
  const refSobre        = useRef(null);
  const refEquipe       = useRef(null);
  const refContato      = useRef(null);

  function scrollTo(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const secoes = [
    { label: "Apresentação", sub: "Conheça o laboratório",    ref: refApresentacao },
    { label: "Atuação",   sub: "e Estrutura",      ref: refSobre },
    { label: "Equipe",       sub: "Conheça os Pesquisadores", ref: refEquipe },
    { label: "Contato",      sub: "Localização",              ref: refContato },
  ];

  const equipeLapgenic = equipe.filter(p => p.lab === "LAPGENIC");

  return (
    <div>

      {/* 1. MURAL*/}
      <div className="mural">
        <img src="imagens/banners/banner.gif" className="mural-img" />
        <div className="mural-header">
          <h1>LAPGENIC</h1>
          <p>Laboratório de Pesquisa em Genética Toxicológica</p>
        </div>
        <div className="mural-container">
          {secoes.map((s) => (
            <div
              key={s.label}
              className="mural-card"
              onClick={() => scrollTo(s.ref)}
            >
              <h3>{s.label}</h3>
              <p>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. APRESENTAÇÃO */}
      <div ref={refApresentacao} />
      <Section title="Sobre o Laboratório">
        <div className="page-with-sidebar">
          <div className="card">
            <a href="https://www.instagram.com/lapgenic/" target="_blank" rel="noopener noreferrer">
              <img  src="/imagens/labs/LAPGENIC.png" alt="LAPGENIC" />
            </a>
          </div>

          <div className="grid-2">
            <div className="lapgenic">
              <img src="imagens/banners/grupo.png" />
            </div>
            <div className="prose">
              <p>
                Desde fevereiro de 2024, o LAPGENIC atua na realização de avaliações
                toxicológicas e mutagênicas de produtos naturais e sintéticos.
              </p>
              <p>
                O laboratório desenvolve pesquisas em oncologia, toxicogenética e saúde ambiental,
                contribuindo para a compreensão de mecanismos de mutação e resposta terapêutica.
              </p>
              <p>
                Também atua na formação de pesquisadores e disseminação do conhecimento científico.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. DIRETRIZES */}
        <div ref={refSobre} className="grid-6">
          <div className="card">
            <h2>Toxicogenética</h2>
            <p>Análise de mutações causadas por xenobióticos.</p>
          </div>
          <div className="card">
            <h2>Oncologia Molecular</h2>
            <p>Estudo de genes relacionados à resposta terapêutica.</p>
          </div>
          <div className="card">
            <h2>Saúde Ambiental</h2>
            <p>Avaliação de impactos ambientais em organismos.</p>
          </div>
          <div className="card">
            <h2>Laboratórios Equipados</h2>
            <p>Ambiente dedicado a análises moleculares e celulares.</p>
          </div>
          <div className="card">
            <h2>Análises Genéticas</h2>
            <p>Detecção de mutações e expressão gênica.</p>
          </div>
          <div className="card">
            <h2>Ensaios Toxicológicos</h2>
            <p>Testes com organismos modelo.</p>
          </div>
        </div>

      {/* 4. EQUIPE */}
      <Section title="Equipe">
        <div ref={refEquipe} className="grid-pesquisadores">

          {equipeLapgenic.length > 0 ? (
            equipeLapgenic.map((p, i) => (
              <CardPesquisador
                key={i}
                nome={p.nome}
                formacao={p.formacao}
                instituicao={p.instituicao}
                areas={p.areas}
                link={p.link}
                imagem={p.imagem}
                email={p.email}
              />
            ))
          ) : (
            <p>Nenhum pesquisador cadastrado para o LAPGENIC.</p>
          )}
        </div>
      </Section>

      {/* 5. CONTATO E MAPA */}
      <Section title="Contato e Localização">
        <div ref={refContato} className="split-about">
          <div className="prose">
            <p><strong>Endereço:</strong><br />
              Av. Universitária<br />
              Teresina – PI<br />
              CEP 64049-550
            </p>
            <p>
              <strong>Responsável:</strong> João Marcelo de Castro Sousa<br />
              <strong>Telefone:</strong> (86) 98100-6336
            </p>
          </div>

          <iframe
            src="https://maps.google.com/maps?q=Teresina&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
          />
        </div>
      </Section>

    </div>
  );
}
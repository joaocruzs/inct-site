import { Link } from "react-router-dom";
import Section from "../components/general/Section";

export default function Lapgenic() {
  return (
    <div>
      {/* 1. APRESENTAÇÃO */}
      <div className="mural">
        <img src="/banners/banner.gif" className="mural-img" />

        <div className="mural-header">
          <h1>LAPGENIC</h1>
          <p>Laboratório de Pesquisa em Genética Toxicológica</p>
        </div>

        <div className="mural-container">
          <a href="#apresentação" className="mural-card">
            <h3>Apresentação</h3>
            <p>Conheça o laboratório</p>
          </a>

          <a href="#sobre" className="mural-card">
            <h3>Sobre</h3>
            <p>Atuação e Estrutura</p>
          </a>

          <a href="#equipe" className="mural-card">
            <h3>Equipe</h3>
            <p>Pesquisadores</p>
          </a>

          <a href="#contato" className="mural-card">
            <h3>Contato</h3>
            <p>Localização</p>
          </a>
        </div>
      </div>

      <Section >
        <div id="sobre" className="grid-2">
          <div className="stat">
            <h3>Áreas de atuação</h3>
            <div className="grid-cards">
              <div className="card">
                <h3>Toxicogenética</h3>
                <p>Análise de mutações causadas por xenobióticos.</p>
              </div>
              <div className="card">
                <h3>Oncologia Molecular</h3>
                <p>Estudo de genes relacionados à resposta a tratamentos.</p>
              </div>
              <div className="card">
                <h3>Saúde Ambiental</h3>
                <p>Avaliação de impactos ambientais em organismos vivos.</p>
              </div>
            </div>
          </div>

          <div className="stat">
            <h3>Infraestrutura</h3>
            <div className="grid-cards">
              <div className="card">
                <h3>Laboratórios Equipados</h3>
                <p>Ambiente adequado para análises moleculares e celulares.</p>
              </div>
              <div className="card">
                <h3>Análises Genéticas</h3>
                <p>Equipamentos para detecção de mutações e expressão gênica.</p>
              </div>
              <div className="card">
                <h3>Ensaios Toxicológicos</h3>
                <p>Testes com organismos modelo e substâncias químicas.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div id="equipe" className="stat">
        <h3>Equipe</h3>
        <div className="grid-cards">
        </div>
      </div>

      <div id="contato" className="stat">
        <h3>Localização e Contato</h3>
        <div className="split-about">

          <div className="prose">
            <p><strong>Endereço:</strong><br />
            Av. Universitária<br />
            Teresina – PI<br />
            CEP 64049-550</p>

            <p>
              <strong>Responsável:</strong> João Marcelo de Castro Sousa<br />
              <strong>Telefone:</strong> (86) 98100-6336
            </p>
          </div>

          <div>
            <iframe
              src="https://maps.google.com/maps?q=Teresina&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "12px" }}
            />
          </div>

        </div>
      </div>
  </div>
  );
}

import { Link } from "react-router-dom";
import Section from "../components/Section";

export default function Lapgenic() {
  return (
    <div>
      {/* 1. MURAL */}
      <div className="mural">
        <img
          src="banners/banner.gif"
          className="mural-img"
          alt="Banner LAPGENIC"
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

      {/* 2. APRESENTAÇÃO */}
      <Section title="Sobre o Laboratório">
        <div className="split-about">
          <div>
            <img src="banners/lapgenic.png"/>
          </div>

          <div className="prose max-w-none space-y-6">
            <p>
              <strong>Desde fevereiro de 2024</strong>, o <strong>LAPGENIC</strong>{" "}
              atua como um laboratório dedicado à realização de avaliações
              toxicológicas e mutagênicas de produtos naturais e sintéticos, com
              foco em pesquisas aplicadas à área da oncologia e da saúde ambiental.
            </p>

            <p>
              Entre suas principais atividades estão as avaliações
              toxicogenéticas de xenobióticos liberados em ambientes aquáticos, a
              determinação do status mutacional de genes envolvidos na resposta a
              drogas antitumorais, além do desenvolvimento de pesquisas voltadas à
              compreensão dos mecanismos de toxicidade e mutagênese.
            </p>

            <p>
              O laboratório também tem como missão a formação de recursos humanos
              em nível de graduação e pós-graduação, a consolidação de um grupo de
              pesquisa qualificado para atuar na área de oncologia e a disseminação
              do conhecimento científico sobre o câncer junto à comunidade
              acadêmica e à sociedade.
            </p>
          </div>
        </div>  
      </Section>

      {/* 3. ENDEREÇO E CONTATO */}
      <Section title="Endereço e Contato">
          <div className="prose max-w-none">
            <p>
              <strong>Endereço:</strong>
              <br />
              Av. Universitária
              <br />
              Teresina – PI – s/n
              <br />
              CEP 64049-550
            </p>

            <p>
              <strong>Responsável:</strong> João Marcelo de Castro Sousa
              <br />
              <strong>Telefone:</strong> (86) 98100-6336
            </p>
          </div>
      </Section>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";

export default function Apoio() {

  return (
    <Section>
      {/* 1. APOIO INSTITUCIONAL */} 
      <div className="grid-apoio">
        <a href="https://www.gov.br/capes/pt-br" className="card-apoio-lateral" target="_blank">
          <img src="imagens/nacionais/CNPQ.png" className="banner-logo" />
        </a>
        <a href="https://www.fapepi.gov.br/" className="card-apoio-lateral" target="_blank">
          <img src="imagens/nacionais/FAPEPI.png" className="banner-logo" />
        </a>
        <a href="https://www.gov.br/capes/pt-br" className="card-apoio-lateral" target="_blank">
          <img src="imagens/nacionais/CAPES.png" className="banner-logo" />
        </a>
      </div>

      <div className="grid-apoio"> 
        <div className="card-apoio-mural" style={{ backgroundColor: '#2c85eb'}}>
          <img src="banners/laboratorios.png" />
          <h2>Contexto no Piauí</h2>
          <p>
            O câncer é um importante desafio de saúde pública no Piauí, com mais de 33 mil internações entre 2019 e 2023. Destaca-se o aumento da mortalidade por tumores do sistema nervoso central, incluindo o glioblastoma, que ainda apresenta limitações terapêuticas.
          </p>
        </div>

        <div className="card-apoio-mural" style={{backgroundColor: '#4699c0'}}>
          <img src="banners/instituicoes.png" />
          <h2>Atuação do INCT</h2>
          <p>
            O INCT OncoTTgen desenvolve pesquisas em oncologia translacional com foco em alterações genéticas, biomarcadores moleculares e novas abordagens terapêuticas, fortalecendo a ciência no estado.
          </p>
        </div>

        <div className="card-apoio-mural" style={{ backgroundColor: '#52a4aa'}}>
          <img src="banners/embreve.png" className="card-membro-img" />
          <h2>Apoio à Pesquisa</h2>
          <p>
            A atuação do instituto é viabilizada por agências de fomento que impulsionam a ciência, inovação e o avanço da oncologia no Brasil.
          </p>
        </div>

      </div>
    </Section>
  );
}
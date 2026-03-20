import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";

let sobre = {
  "definicoes": [
    {
      "titulo": "O que é oncologia translacional?",
      "descricao": "É uma área da pesquisa em saúde que busca transformar descobertas científicas do laboratório em aplicações clínicas, aproximando a ciência básica do cuidado direto ao paciente."
    },
    {
      "titulo": "O que são terapias gênicas?",
      "descricao": "São estratégias terapêuticas que atuam diretamente no material genético das células, com o objetivo de corrigir, silenciar ou modificar genes associados a doenças como o câncer."
    },
    {
      "titulo": "O que é CRISPR/Cas9?",
      "descricao": "É uma tecnologia de edição gênica que permite modificar o DNA de forma precisa, utilizando uma enzima guiada por RNA para alterar genes relacionados à progressão tumoral ou à resistência terapêutica."
    },
    {
      "titulo": "O que é siRNA?",
      "descricao": "O RNA interferente pequeno (siRNA) é uma molécula que promove o silenciamento gênico ao induzir a degradação do RNA mensageiro, impedindo a produção de proteínas associadas ao crescimento tumoral."
    },
    {
      "titulo": "O que é quimiorresistência?",
      "descricao": "É a capacidade das células tumorais de resistirem aos efeitos de medicamentos quimioterápicos, reduzindo a eficácia do tratamento."
    },
    {
      "titulo": "O que são nanomedicamentos?",
      "descricao": "São medicamentos formulados em escala nanométrica que permitem o transporte direcionado de fármacos ou terapias gênicas, aumentando a eficácia e reduzindo efeitos colaterais."
    }
  ]
}


export default function Sobre() {
  const [abertos, setAbertos] = useState([]);

  function toggle(index) {
    setAbertos((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]               
    );
  }

  return (
    <div>
      {/* 1. SOBRE O INSTITUTO */}
      <Section title="Sobre o Instituto">
        <div className="split-about"> 
          <div><img src="banners/instituicoes.png" /> </div>
          <div className="prose max-w-none mb-12">
            <p>
                "O Instituto Nacional de Ciência e Tecnologia de Oncologia Translacional e 
                Terapias Gênicas (INCT OncoTTGen) é uma rede nacional e internacional dedicada 
                ao desenvolvimento de soluções inovadoras para o diagnóstico e tratamento do 
                câncer, com foco especial nos tumores que acometem o sistema nervoso central.
            </p>

            <p>
              "O Instituto atua na interface entre a pesquisa básica e a aplicação clínica, 
              integrando conhecimentos em oncologia translacional, biologia molecular, nanotecnologia 
              e terapias gênicas. Seu objetivo é acelerar a transformação de descobertas científicas 
              em estratégias terapêuticas mais eficazes e seguras.",
            </p>
          </div>
        </div>

        <div className="split-about"> 
          <div className="prose max-w-none mb-12">
            <p>
              Entre as principais frentes de atuação estão o desenvolvimento de terapias baseadas 
              em CRISPR/Cas9 e RNAs de interferência (siRNA), associadas a nanomedicamentos capazes 
              de superar barreiras biológicas como a barreira hematoencefálica. Essas abordagens buscam 
              combater a quimiorresistência tumoral e melhorar a sobrevida e a qualidade de vida dos pacientes.
            </p>

            <p>  
              Além da pesquisa científica, o INCT tem como missão a formação de recursos humanos qualificados, 
              a transferência de conhecimento para o setor público, a popularização da ciência e o estímulo à 
              inovação tecnológica, contribuindo para o fortalecimento do Sistema Único de Saúde e da pesquisa 
              oncológica no Brasil.
            </p>
          </div>
          <div><img src="banners/laboratorios.png" /> </div>
        </div>

        {/* 2. CONCEITOS */}
        <div className="faq">
          {sobre.definicoes.map((item, i) => {
            const isOpen = abertos.includes(i);

            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-header"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-titulo">{item.titulo}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                <div className="faq-content">
                  <p>{item.descricao}</p>
                </div>
              </div>

            );
          })}
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
    </div>
  );
}
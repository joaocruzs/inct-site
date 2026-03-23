import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/general/Section";
import MapaInstituicoes from "../components/general/MapaInstituicoes";
import dados from "../data/parceiros.json";

const categorias = [
  { nome: "Todas", cor: "#64748b" },
  { nome: "Hospitais", cor: "#ef4444" },
  { nome: "Instituições Parceiras", cor: "#3b82f6" },
  { nome: "Laboratórios", cor: "#10b981" },
  { nome: "Apoio Internacional", cor: "#8b5cf6" }
];

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

  const [selecionado, setSelecionado] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const dadosFiltrados =
    categoriaAtiva === "Todas"
      ? dados
      : dados.filter((item) => item.categoria === categoriaAtiva);

  return (
    <>
      {/* 1. BANNER*/}
      <div className="mural">
        <img src="/banners/banner.gif" className="mural-img" />
        <div className="mural-container">
          <a href="#piaui" className="mural-card">
            <h3>Contexto</h3>
            <p>Estatísticas no Piauí</p>
          </a>
          <a href="#conceitos" className="mural-card">
            <h3>Instituto</h3>
            <p>Linhas de atuação</p>
          </a>
          <a href="#linhas" className="mural-card">
            <h3>Pesquisa</h3>
            <p>Linhas de trabalho</p>
          </a>
          <a href="#mapa" className="mural-card">
            <h3>Parceiros</h3>
            <p>Mapeamento institucional</p>
          </a>
          <a href="#faq" className="mural-card">
            <h3>FAQ</h3>
            <p>Dúvidas frequentes</p>
          </a>
        </div>
      </div>

      {/* 2. APOIO INSTITUCIONAL */}
      <section className="section apoio">
        <h2 className="section-title">Apoio Institucional</h2>

        <p className="apoio-desc">
          O INCT OncoTTGen conta com o apoio de agências de fomento que fortalecem a
          pesquisa científica e o desenvolvimento tecnológico no Brasil.
        </p>

        <div className="apoio-logos">
          <a href="https://www.gov.br/cnpq/pt-br" className="apoio-card" target="_blank">
            <img src="imagens/nacionais/CNPQ.png" className="banner-logo" />
          </a>
          <a href="https://www.fapepi.pi.gov.br/" className="apoio-card" target="_blank">
            <img src="imagens/nacionais/FAPEPI.png" className="banner-logo" />
          </a>
          <a href="https://www.gov.br/capes/pt-br" className="apoio-card" target="_blank">
            <img src="imagens/nacionais/CAPES.png" className="banner-logo" />
          </a>
        </div>
      </section>

      {/* 3. SEÇÃO ESTATÍSTICA */}
        <div id="piaui" className="destaque">
          <h2 className="section-title">Contexto no Piauí</h2>
          <p className="prose">
            O câncer é um importante desafio de saúde pública no estado, com aumento de casos
            relacionados ao sistema nervoso central e limitações terapêuticas.
          </p>
          <div className="stats">
            <div className="stat">
              <h3>33.000+</h3>
              <p>Internações (2019–2023)</p>
            </div>
            <div className="stat">
              <h3>↑ Mortalidade</h3>
              <p>Tumores cerebrais</p>
            </div>
            <div className="stat">
              <h3>Alta demanda</h3>
              <p>Tratamentos inovadores</p>
            </div>
          </div>
        </div>

      {/* 4. MINITEMAS */}
      <div id="conceitos" className="destaque">
        <h2 className="section-title">Sobre o Instituto</h2>
        <div className="grid-cards">
          <div className="card">
            <h3>Missão</h3>
            <p>Desenvolver soluções inovadoras para o diagnóstico e tratamento do câncer.</p>
          </div>
          <div className="card">
            <h3>Visão</h3>
            <p>Ser referência nacional e internacional em oncologia translacional.</p>
          </div>
          <div className="card">
            <h3>Impacto</h3>
            <p>Transformar descobertas científicas em benefícios reais para pacientes.</p>
          </div>
        </div>
      </div>

      {/* 5. LINHAS DE PESQUISA */}
      <div id="linhas"className="destaque">
        <h2 className="section-title">Linhas de Pesquisa</h2>
        <div className="grid-cards">
          <div className="card">
            <h3>CRISPR/Cas9</h3>
            <p>Edição genética aplicada ao tratamento do câncer.</p>
          </div>
          <div className="card">
            <h3>siRNA</h3>
            <p>Silenciamento gênico para combater tumores.</p>
          </div>
          <div className="card">
            <h3>Nanomedicina</h3>
            <p>Entrega direcionada de terapias com maior eficácia.</p>
          </div>
        </div>
      </div>

      <div id="mapa" title="Mapeamento Institucional" className="destaque">
        <h2 className="section-title">Mapeamento Institucional</h2>
        <div className="page-with-sidebar apoio-layout">
          {/* 6.1. SIDEBAR */}
          <div className="sidebar-apoio">
            {/* 6.1.1. FILTROS */}
            <div className="filtros">
              <h3>Filtrar por categoria</h3>

              {categorias.map((cat) => (
                <button
                  key={cat.nome}
                  className={`filtro-btn ${categoriaAtiva === cat.nome ? "ativo" : ""}`}
                  onClick={() => {
                    setCategoriaAtiva(cat.nome);
                    setSelecionado(null);
                  }}
                  style={{ borderColor: cat.cor }}
                >
                  <span
                    className="dot"
                    style={{ background: cat.cor }}
                  ></span>
                  {cat.nome}
                </button>
              ))}
            </div>

            {/* 6.1.2.DETALHES */}
            <div className="detalhes">
              {selecionado ? (
                <>
                  <img src={selecionado.imagem} alt={selecionado.nome} />
                  <h4>{selecionado.nome}</h4>
                  <p>{selecionado.descricao || "Sem descrição disponível."}</p>

                  <a href={selecionado.link} target="_blank">
                    Acessar site
                  </a>
                </>
              ) : (
                <p className="placeholder">
                  Selecione um ponto no mapa para ver detalhes.
                </p>
              )}
            </div>

            <div className="section-action">
              <Link to="/parceiros">Ver todos os parceiros</Link>
            </div>
          </div>

          {/* 6.2. MAPA */}
          <div className="mapa-area">
            <MapaInstituicoes
              dados={dadosFiltrados}
              onSelect={setSelecionado}
              categoriaAtiva={categoriaAtiva}
            />
          </div>
        </div>
      </div>

      {/* 7. FAQ */}
      <div id="faq" title="Perquntas Frequentes" className="destaque">
        <h2 className="section-title">Perguntas Frequentes</h2>
        {sobre.definicoes.map((item, i) => {
          const isOpen = abertos.includes(i);
          return (
            <div>

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
            </div>

          );
        })}
      </div>
    </>
  );
}
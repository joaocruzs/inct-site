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

export default function Apoio() {
  const [selecionado, setSelecionado] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const dadosFiltrados =
    categoriaAtiva === "Todas"
      ? dados
      : dados.filter((item) => item.categoria === categoriaAtiva);

  return (
    <Section>

      {/* MURAL */}
      <div className="mural"> 
        <img src="banners/banner.gif" className="mural-img" />

        <div className="mural-container">
          <a href="https://www.gov.br/cnpq/pt-br" className="mural-card" target="_blank">
            <img src="imagens/nacionais/CNPQ.png" className="banner-logo" />
          </a>

          <a href="https://www.fapepi.pi.gov.br/" className="mural-card" target="_blank">
            <img src="imagens/nacionais/FAPEPI.png" className="banner-logo" />
          </a>

          <a href="https://www.gov.br/capes/pt-br" className="mural-card" target="_blank">
            <img src="imagens/nacionais/CAPES.png" className="banner-logo" />
          </a>
        </div>
      </div>

      {/* MAPA + SIDEBAR */}
      <div className="page-with-sidebar apoio-layout">

        {/* SIDEBAR */}
        <div className="sidebar-apoio">

          {/* FILTROS */}
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

          {/* DETALHES */}
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

        {/* MAPA */}
        <div className="mapa-area">
          <MapaInstituicoes
            dados={dadosFiltrados}
            onSelect={setSelecionado}
            categoriaAtiva={categoriaAtiva}
          />
        </div>

      </div>
    </Section>
  );
}
import Section from "../components/Section";

import comite from "../data/comite.json";

export default function Comite() {
  return (
    <Section title="Comitê Gestor">
      {/* 1. ROLETA DE IMAGENS */}
      <div className="roleta-wrapper">
        <div className="roleta-track">
          {comite.concat(comite).map((pessoa, i) => (
            <a 
              key={i} 
              href={`#membro-${i % comite.length}`} 
              className="roleta-link"
            >
              <img
                src={pessoa.imagem}
                alt={pessoa.nome}
                className="roleta-img"
              />
            </a>
          ))}
        </div>
      </div>

      {/* 2. LISTA DE CARDS */}
      <div className="lista-comite">
        {comite.map((pessoa, i) => (
          <div key={i} id={`membro-${i}`} className="card-comite">
            <img src={pessoa.imagem} alt={pessoa.nome} className="foto" />

            <div className="card-texto">
              <h3>{pessoa.nome}</h3>
              <p className="cargo">{pessoa.cargo}</p>
              <p className="descricao">{pessoa.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

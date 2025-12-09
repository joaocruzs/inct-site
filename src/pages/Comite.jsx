import comite from "../data/comite.json";
import Section from "../components/Section";

export default function Comite() {
  return (
    <Section title="Comitê Gestor">
      {/* ====== BLOCO DO CARROSSEL / MURAL ====== */}
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {comite.concat(comite).map((pessoa, i) => (
            <a 
              key={i} 
              href={`#membro-${i % comite.length}`} 
              className="carousel-link"
            >
              <img
                src={pessoa.imagem}
                alt={pessoa.nome}
                className="carousel-img"
              />
            </a>
          ))}
        </div>
      </div>

      {/* ====== LISTA DE CARDS ====== */}
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

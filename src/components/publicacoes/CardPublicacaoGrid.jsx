import { FaExternalLinkAlt } from "react-icons/fa";

export default function CardPublicacaoGrid({ titulo, autores, ano, link }) {
  return (
    <article className="card-publicacao-grid">
      <div className="pub-meta">
        <span className="pub-ano">{ano}</span>
      </div>

      <h3>{titulo}</h3>
      <p className="pub-autores">{autores}</p>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="pub-link"
      >
        Acessar DOI <FaExternalLinkAlt />
      </a>
    </article>
  );
}

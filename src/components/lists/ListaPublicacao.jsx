import { FaExternalLinkAlt } from "react-icons/fa";

export default function ListaPublicacao({ titulo, autores, ano, link }) {
  return (
    <article className="publicacao-list">
      <div className="publicacao-list-content">
        <span className="pub-ano">{ano}</span>

        <h3>{titulo}</h3>
        <p className="pub-autores">{autores}</p>

        <a href={link} target="_blank" rel="noreferrer">
          DOI <FaExternalLinkAlt />
        </a>
      </div>
    </article>
  );
}

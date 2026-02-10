import { FaExternalLinkAlt } from "react-icons/fa";

export default function ListaPublicacao({ titulo, autores, ano, link, tags }) {
  return (
    <article className="publicacao-list">
      <div className="publicacao-list-content">
        <span className="pub-ano">{ano}</span>

        <h3>{titulo}</h3>
        <p className="pub-autores">{autores}</p>

        <a href={link} target="_blank" rel="noreferrer">
          Acessar <FaExternalLinkAlt />
        </a>
        {console.log("LINK:", link)}

        <div className="pub-tags">
          {tags.map((tag, index) => (
            <span key={index} className="pub-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

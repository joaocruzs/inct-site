import { FaExternalLinkAlt } from "react-icons/fa";

export default function CardPublicacaoHome({ titulo, autores, ano, link }) {
  return (
    <article className="card-publicacao-home">
      <span className="pub-ano">{ano}</span>

      <h3>{titulo}</h3>
      <p className="pub-autores">{autores}</p>

      <a href={link} target="_blank" rel="noreferrer">
        Ler publicação <FaExternalLinkAlt />
      </a>
    </article>
  );
}

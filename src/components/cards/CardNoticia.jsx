import { Link } from "react-router-dom";

export default function CardNoticia({
  _id,
  imagem,
  titulo,
  data,
  tags = [],
  link
}) {
  const isImprensa = tags.includes("Imprensa") && link;

  const content = (
    <article className={`noticia-list noticia-card-horizontal ${isImprensa ? "imprensa-card" : ""}`}>
      
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">

        <div className="noticia-meta">
          <span className="noticia-data">
            {new Date(data).toLocaleDateString()}
          </span>

          {isImprensa && (
            <span className="noticia-tag imprensa-tag">
              Imprensa
            </span>
          )}
        </div>

        <h3 className="noticia-titulo">{titulo}</h3>

      </div>

    </article>
  );

  if (isImprensa) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="special-link"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={`/noticias/${_id}`} className="special-link">
      {content}
    </Link>
  );
}
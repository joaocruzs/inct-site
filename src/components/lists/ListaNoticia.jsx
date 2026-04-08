import { Link } from "react-router-dom";

export default function ListaNoticia({
  _id,
  imagem,
  titulo,
  resumo,
  data,
  tags = [],
  link
}) {
  const isExterna = tags.includes("EXTERNO") && link;

  const content = (
    <article className={`noticia-list ${isExterna ? "externa" : ""}`}>
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">
        <span className="noticia-data">
          {new Date(data).toLocaleDateString()}
        </span>

        {/* 🔥 destaque especial para externa */}
        {isExterna && (
          <span className="noticia-tag externa-tag">
            Externa 🔗
          </span>
        )}

        {/* outras tags (opcional manter) */}
        {tags.length > 0 && (
          <div className="noticia-tags">
            {tags
              .filter((t) => t !== "EXTERNO")
              .map((t) => (
                <span key={t} className="noticia-tag">
                  {t}
                </span>
              ))}
          </div>
        )}

        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );

  if (isExterna) {
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
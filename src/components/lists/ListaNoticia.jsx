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
    <article className="noticia-list">
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">
        <span className="noticia-data">
          {new Date(data).toLocaleDateString()}
        </span>

        {/* ✅ renderiza todas as tags */}
        {tags.length > 0 && (
          <div className="noticia-tags">
            {tags.map((t) => (
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
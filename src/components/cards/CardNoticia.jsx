import { Link } from "react-router-dom";

export default function CardNoticia({
  _id,
  imagem,
  titulo,
  data,
  tags = [],
  link
}) {
  const isExterna = tags.includes("EXTERNO") && link;

  const formatarData = (dataString) => {
    if (!dataString) return null;
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const content = (
    <>
      {imagem && (
        <div className="card-noticia-img">
          <img src={imagem} alt={titulo} />
        </div>
      )}

      <div className="card-noticia-content">
        <h3 className="noticia-titulo">{titulo}</h3>

        {data && (
          <span className="noticia-data">
            {formatarData(data)}
          </span>
        )}

        {/* ✅ tags como array */}
        {tags.length > 0 && (
          <div className="noticia-tags">
            {tags.map((t) => (
              <span key={t} className="noticia-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <article className="card-noticia-horizontal">
      {isExterna ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-noticia-link"
        >
          {content}
        </a>
      ) : (
        <Link
          to={`/noticias/${_id}`}
          className="card-noticia-link"
        >
          {content}
        </Link>
      )}
    </article>
  );
}
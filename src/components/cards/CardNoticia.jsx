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

        <div className="noticia-rodape">
          {data && (
            <span className="noticia-data">
              {formatarData(data)}
            </span>
          )}

          {isImprensa && (
            <span className="noticia-tag imprensa-tag">
              Imprensa
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article className={`card-noticia-horizontal ${isImprensa ? "imprensa" : ""}`}>
      {isImprensa ? (
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
import { Link } from "react-router-dom";

export default function ListaNoticia({
  _id,
  imagem,
  titulo,
  resumo,
  data
}) {
  return (
    <Link to={`/noticias/${_id}`} className="special-link">
      <article className="noticia-list">
        <img src={imagem} alt={titulo} />

        <div className="noticia-list-content">
          <span className="noticia-data">
            {new Date(data).toLocaleDateString()}
          </span>
          <h3>{titulo}</h3>
          <p>{resumo}</p>
        </div>
      </article>
    </Link>
  );
}

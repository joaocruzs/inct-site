import { Link } from "react-router-dom";

export default function CardNoticia({ _id, imagem, titulo, resumo }) {
  return (
    <article className="card-noticia">
      <Link to={`/noticias/${_id}`} className="special-link">
        <div className="card-noticia-img">
          <img src={imagem} alt={titulo} />
        </div>

        <div className="card-noticia-body">
          <h3>{titulo}</h3>
          <p>{resumo}</p>
        </div>
      </Link>
    </article>
  );
}

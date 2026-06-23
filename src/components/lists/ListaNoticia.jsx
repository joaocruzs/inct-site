import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TAG_SLUGS = {
  Imprensa: "imprensa",
  Conquistas: "conquistas",
  Defesas: "defesas",
  Eventos: "eventos",
  Resultados: "resultados",
  INCT: "inct",
};

export default function ListaNoticia({
  _id,
  imagem,
  titulo,
  resumo,
  data,
  tags = [],
  link
}) {
  const isImprensa = tags.includes("Imprensa") && link;
  const tagSlug = tags.length === 1 ? TAG_SLUGS[tags[0]] : "neutro";

  const [mostrarResumo, setMostrarResumo] = useState(
    typeof window !== "undefined" ? window.innerWidth > 678 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setMostrarResumo(window.innerWidth > 678);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = (
    <article
      className="noticia-list noticia-destaque"
      data-tag={tagSlug}
    >
    
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">

        <div className="noticia-meta">
          <span className="noticia-data">
            {new Date(data).toLocaleDateString()}
          </span>

          {tags.map((tag) => (
            <span
              key={tag}
              className="noticia-tag-label"
              data-tag={TAG_SLUGS[tag]}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3>{titulo}</h3>
        {mostrarResumo && <p>{resumo}</p>}

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
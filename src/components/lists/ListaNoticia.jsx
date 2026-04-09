import { useEffect, useState } from "react";
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
  const isImprensa = tags.includes("Imprensa") && link;
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
    <article className={`noticia-list ${isImprensa ? "imprensa" : ""}`}>
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">
        <span className="noticia-data">
          {new Date(data).toLocaleDateString()}
        </span>

        {/* 🔥 destaque especial para imprensa */}
        {isImprensa && (
          <span className="noticia-tag imprensa-tag">
            Imprensa
          </span>
        )}

        {/* outras tags (opcional manter) */}
        {tags.length > 0 && (
          <div className="noticia-tags">
            {tags
              .filter((t) => t !== "Imprensa")
              .map((t) => (
                <span key={t} className="noticia-tag">
                  {t}
                </span>
              ))}
          </div>
        )}

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
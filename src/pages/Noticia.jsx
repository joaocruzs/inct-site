import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import { getNoticiaById } from "../services/noticias.service";
import { formatarConteudoNoticia } from "../utils/contentFormatter";

/* PÁGINA 8.1 -- NOTÍCIA DE NOTÍCIAS */

export default function Noticia() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNoticiaById(id)
      .then(setNoticia)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container>Carregando...</Container>;
  if (!noticia) return <Container>Notícia não encontrada.</Container>;

  return (
    <Container>
      <article className="conteudo-page">
        <h1>{noticia.titulo}</h1>

        <p className="meta">
          {noticia.data} · {noticia.laboratorio}
        </p>

        <div
          className="conteudo-texto"
          dangerouslySetInnerHTML={{ __html: formatarConteudoNoticia(noticia.resumo) }}
        />
        
        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="conteudo-img"
          />
        )}

        <div
          className="conteudo-texto"
          dangerouslySetInnerHTML={{ __html: formatarConteudoNoticia(noticia.conteudo) }}
        />

        
      </article>
    </Container>
  );
}

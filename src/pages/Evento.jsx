import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import { getEventoById } from "../services/eventos.service";

export default function Evento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventoById(id)
      .then(setEvento)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container>Carregando...</Container>;
  if (!evento) return <Container>Evento não encontrado.</Container>;

  return (
    <Container>
      <article className="conteudo-page">
        <h1>{evento.titulo}</h1>

        <p className="meta">
          {evento.dataInicio} → {evento.dataFim} · {evento.local}
        </p>

        {evento.imagem && (
          <img
            src={evento.imagem}
            alt={evento.titulo}
            className="conteudo-img"
          />
        )}

        <div
          className="conteudo-texto"
          dangerouslySetInnerHTML={{ __html: evento.conteudo }}
        />
      </article>
    </Container>
  );
}

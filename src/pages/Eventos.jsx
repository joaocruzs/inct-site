import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import EventolistItem from "../components/eventos/EventolistItem";
import eventos from "../data/eventos.json";

export default function Eventos() {
  return (
    <Container>
      <PageTitle>Eventos</PageTitle>

      <div className="evento-list-item">
        {eventos.map((evento, index) => (
          <EventolistItem
            key={index}
            titulo={evento.titulo}
            data={evento.data}
            local={evento.local}
            imagem={evento.imagem}
          />
        ))}
      </div>
    </Container>
  );
}

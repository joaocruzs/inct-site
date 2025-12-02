import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import CardEvento from "../components/CardEvento";
import eventos from "../data/eventos.json";

export default function Eventos() {
  return (
    <Container>
      <PageTitle>Eventos</PageTitle>

      <div className="grid grid-2">
        {eventos.map((evento, index) => (
          <CardEvento
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

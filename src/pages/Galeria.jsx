import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import CardGaleria from "../components/CardGaleria";
import galeria from "../data/galeria.json";

export default function Galeria() {
  return (
    <Container>
      <PageTitle>Galeria</PageTitle>

      <div className="grid grid-3">
        {galeria.map((foto, index) => (
          <CardGaleria
            key={index}
            imagem={foto.imagem}
            legenda={foto.legenda}
          />
        ))}
      </div>
    </Container>
  );
}

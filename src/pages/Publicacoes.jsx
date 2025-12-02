import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import CardPublicacao from "../components/CardPublicacao";
import publicacoes from "../data/publicacoes.json";

export default function Publicacoes() {
  return (
    <Container>
      <PageTitle>Publicações</PageTitle>

      <div className="grid grid-2">
        {publicacoes.map((pub, index) => (
          <CardPublicacao
            key={index}
            titulo={pub.titulo}
            autores={pub.autores}
            ano={pub.ano}
            link={pub.link}
          />
        ))}
      </div>
    </Container>
  );
}

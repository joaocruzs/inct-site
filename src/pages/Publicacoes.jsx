import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import PublicacaoListItem from "../components/publicacoes/PublicacaoListItem";
import publicacoes from "../data/publicacoes.json";

export default function Publicacoes() {
  return (
    <Container>
      <PageTitle>Publicações</PageTitle>

      <div className="publicacao-list-item">
        {publicacoes.map((pub, index) => (
          <PublicacaoListItem
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

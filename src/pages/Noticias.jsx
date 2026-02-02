import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import NoticiaListItem from "../components/noticias/NoticiaListItem";
import noticias from "../data/noticias.json";

export default function Noticias() {
  return (
    <Container>
      <PageTitle>Notícias</PageTitle>

      <div className="noticia-list-item">
        {noticias.map((noticia, index) => (
          <NoticiaListItem
            key={index}
            titulo={noticia.titulo}
            data={noticia.data}
            resumo={noticia.resumo}
            imagem={noticia.imagem}
          />
        ))}
      </div>
    </Container>
  );
}

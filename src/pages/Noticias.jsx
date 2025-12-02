import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import CardNoticia from "../components/CardNoticia";
import noticias from "../data/noticias.json";

export default function Noticias() {
  return (
    <Container>
      <PageTitle>Notícias</PageTitle>

      <div className="grid grid-3">
        {noticias.map((noticia, index) => (
          <CardNoticia
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

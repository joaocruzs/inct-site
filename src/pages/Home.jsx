import HeroBanner from "../components/HeroBanner";
import Section from "../components/Section";
import CardNoticia from "../components/CardNoticia";
import noticias from "../data/noticias.json";

export default function Home() {
  return (
    <>
      {/* Hero*/}
      <HeroBanner
        imagem="imagens/banner.gif"
        titulo="Inovação e Avanços na Oncologia"
        subtitulo="Pesquisas em Terapias Gênicas, CRISPR e Nanotecnologia."
      />

      {/* Sobre rápido */}
      <Section title="O Instituto">
        <p>
          O INCT OncottGen é dedicado ao desenvolvimento de tecnologias inovadoras em oncologia,
          com foco em terapias gênicas, siRNA, CRISPR e pesquisas translacionais.
        </p>
      </Section>

      {/* Últimas notícias */}
      <Section title="Últimas Notícias">
        <div className="grid grid-3">
          {noticias.slice(0, 3).map((n, i) => (
            <CardNoticia
              key={i}
              imagem={n.imagem}
              titulo={n.titulo}
              resumo={n.resumo}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

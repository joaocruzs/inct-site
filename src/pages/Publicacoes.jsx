import { useState } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import FilterSidebar from "../components/FilterSidebar";
import PublicacaoList from "../components/PublicacaoList";
import publicacoes from "../data/publicacoes.json";

export default function Publicacoes() {
  const [filtradas, setFiltradas] = useState(publicacoes);

  function aplicarFiltros(filtros) {
    let resultado = publicacoes;

    if (filtros.tags.length > 0) {
      resultado = resultado.filter((p) =>
        filtros.tags.every((t) => p.tags.includes(t))
      );
    }

    setFiltradas(resultado);
  }

  return (
    <Container>
      <PageTitle>Publicações</PageTitle>

      <div className="page-with-sidebar">
        <FilterSidebar
          periodos={[]}
          laboratorios={[]}
          tags={[
            "siRNA",
            "CRISPR",
            "Nanotecnologia",
            "Terapia Gênica"
          ]}
          onApply={aplicarFiltros}
        />

        <div className="page-content">
          {filtradas.map((p, i) => (
            <PublicacaoList key={i} {...p} />
          ))}
        </div>
      </div>
    </Container>
  );
}

import { useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaPublicacao from "../components/lists/ListaPublicacao";

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

      {/* 1. FILTROS DE BUSCA */}
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

        {/* 2. LISTA DE PUBLICAÇÕES */}
        <div className="page-content">
          {filtradas.map((p, i) => (
            <ListaPublicacao key={i} {...p} />
          ))}
        </div>
      </div>
    </Container>
  );
}

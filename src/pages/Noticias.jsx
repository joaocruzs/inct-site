import { useState } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import FilterSidebar from "../components/FilterSidebar";
import ListaNoticia from "../components/ListaNoticia";

import noticias from "../data/noticias.json";

export default function Noticias() {
  const [filtradas, setFiltradas] = useState(noticias);

  function aplicarFiltros(filtros) {
    let resultado = noticias;

    if (filtros.laboratorio) {
      resultado = resultado.filter(
        (n) => n.laboratorio === filtros.laboratorio
      );
    }

    if (filtros.tags.length > 0) {
      resultado = resultado.filter((n) =>
        filtros.tags.every((t) => n.tags.includes(t))
      );
    }

    setFiltradas(resultado);
  }

  return (
    <Container>
      <PageTitle>Notícias</PageTitle>

      {/* 1. FILTROS DE BUSCA */}
      <div className="page-with-sidebar">
        <FilterSidebar
          periodos={[
            { label: "Últimos 7 dias", value: "7d" },
            { label: "Últimos 30 dias", value: "30d" },
            { label: "Último ano", value: "1y" }
          ]}
          laboratorios={["LAPGENIC", "INCT"]}
          tags={["CRISPR", "siRNA", "Nanotecnologia"]}
          onApply={aplicarFiltros}
        />
        {/* 2. LISTA DE NOTÍCIAS */}
        <div className="page-content">
          {filtradas.map((n, i) => (
            <ListaNoticia key={i} {...n} />
          ))}
        </div>
      </div>
    </Container>
  );
}

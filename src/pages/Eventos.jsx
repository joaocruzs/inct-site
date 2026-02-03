import { useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaEvento from "../components/lists/ListaEvento";

import eventos from "../data/eventos.json";

export default function Eventos() {
  const [filtrados, setFiltrados] = useState(eventos);

  function aplicarFiltros(filtros) {
    let resultado = eventos;

    if (filtros.periodo === "futuros") {
      const hoje = new Date();
      resultado = resultado.filter(
        (e) => new Date(e.dataInicio) >= hoje
      );
    }

    if (filtros.laboratorio) {
      resultado = resultado.filter(
        (e) => e.laboratorio === filtros.laboratorio
      );
    }

    setFiltrados(resultado);
  }

  return (
    <Container>
      <PageTitle>Eventos</PageTitle>

      {/* 1. FILTROS DE BUSCA */}
      <div className="page-with-sidebar">
        <FilterSidebar
          periodos={[
            { label: "Próximos eventos", value: "futuros" },
            { label: "Eventos passados", value: "passados" }
          ]}
          laboratorios={["LAPGENIC", "INCT"]}
          tags={[]}
          onApply={aplicarFiltros}
        />

        {/* 2. LISTA DE EVENTOS */}
        <div className="page-content">
          {filtrados.map((e, i) => (
            <ListaEvento key={i} {...e} />
          ))}
        </div>
      </div>
    </Container>
  );
}

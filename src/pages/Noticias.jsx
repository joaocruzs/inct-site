import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaNoticia from "../components/lists/ListaNoticia";

import { getNoticias } from "../services/noticias.service";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  /* 1. BUSCA INICIAL (SERVICE) */
  useEffect(() => {
    getNoticias()
      .then((data) => {
        setNoticias(data);
        setFiltradas(data);
      })
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, []);

  /* 2. FILTROS */
  function aplicarFiltros(filtros) {
    let resultado = [...noticias];

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

      <div className="page-with-sidebar">
        {/* 1. FILTROS */}
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

        {/* 2. LISTA */}  
        <div className="page-content">
          {loading && <p>Carregando notícias...</p>}
          {erro && <p>Erro ao carregar notícias.</p>}

          {!loading &&
            filtradas.map((n) => (
              <ListaNoticia key={n._id} {...n} />
            ))}
        </div>
      </div>
    </Container>
  );
}

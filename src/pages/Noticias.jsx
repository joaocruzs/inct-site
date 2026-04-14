import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaNoticia from "../components/lists/ListaNoticia";
import { getNoticias } from "../services/noticias.service";

/* PÁGINA 8 -- NOTÍCIAS */

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  /* I. BUSCA INICIAL (SERVICE) */
  useEffect(() => {
    getNoticias()
      .then((data) => {
        const ordenadas = [...data].sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticias(ordenadas);
        setFiltradas(ordenadas);
      })
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, []);

function aplicarFiltros(filtros) {
  let resultado = [...noticias];

  /* II. LABORATÓRIO */
  if (filtros.laboratorio) {
    resultado = resultado.filter(
      (n) => n.laboratorio === filtros.laboratorio
    );
  }

  /* III. TAGS */
  if (filtros.tags && filtros.tags.length > 0) {
    resultado = resultado.filter((n) =>
      (n.tags || []).some((tag) => filtros.tags.includes(tag))
    );
  }

  /* IV. PERÍODO */
  if (filtros.periodo) {
    const hoje = new Date();

    resultado = resultado.filter((n) => {
      if (!n.data) return false;

      const dataNoticia = new Date(n.data);
      const diff = hoje - dataNoticia;

      const dia = 24 * 60 * 60 * 1000;

      switch (filtros.periodo) {
        case "7d":
          return diff <= 7 * dia;
        case "30d":
          return diff <= 30 * dia;
        case "1y":
          return diff <= 365 * dia;
        default:
          return true;
      }
    });
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
          tags={["INCT", "Imprensa"]}
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

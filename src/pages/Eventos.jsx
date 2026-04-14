import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaEvento from "../components/lists/ListaEvento";
import { getEventos, getEventosFuturos } from "../services/eventos.service";

/* PÁGINA 10 -- EVENTOS */

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  /* I. BUSCA INICIAL (SERVICE) */
  useEffect(() => {
    getEventos()
      .then((data) => {
        setEventos(data);
        setFiltrados(data);
      })
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, []);

  /* II - FILTROS */
  async function aplicarFiltros(filtros) {
    setLoading(true);
    
    try {
      let resultado;
      if (filtros.periodo === "futuros") {
        resultado = await getEventosFuturos();
      } else {
        resultado = [...eventos];

        if (filtros.periodo === "passados") {
          const hoje = new Date();
          resultado = resultado.filter(
            (e) => new Date(e.dataFim || e.dataInicio) < hoje
          );
        }
      }

      if (filtros.laboratorio) {
        resultado = resultado.filter(
          (e) => e.laboratorio === filtros.laboratorio
        );
      }

      setFiltrados(resultado);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <PageTitle>Eventos</PageTitle>

      <div className="page-with-sidebar">
        {/* ===============================
            FILTROS

        <FilterSidebar
          periodos={[
            { label: "Próximos eventos", value: "futuros" },
            { label: "Eventos passados", value: "passados" }
          ]}
          laboratorios={["LAPGENIC", "INCT"]}
          tags={[]}
          onApply={aplicarFiltros}
        />
        =============================== */}
        {/* ===============================
            LISTA
        =============================== */}
        <div className="page-content">
          {loading && <p>Carregando eventos...</p>}
          {erro && <p>Erro ao carregar eventos.</p>}

          {!loading && !erro && filtrados.length === 0 && (
            <p>Nenhum evento registrado até o momento.</p>
          )}

          {!loading &&
            filtrados.map((e) => (
              <ListaEvento key={e._id} {...e} />
            ))}
        </div>
      </div>
    </Container>
  );
}

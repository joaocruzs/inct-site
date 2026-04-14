import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import ListaPublicacao from "../components/lists/ListaPublicacao";
import { getArtigos } from "../services/artigos.service";

/* PÁGINA 9 -- ARTIGOS PUBLICADOS */

export default function Artigos() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getArtigos()
      .then((data) => setPublicacoes(data))
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <PageTitle>Artigos</PageTitle>

      {/* 1. FILTROS DE BUSCA }
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
*/}
        {loading && <p>Carregando publicações...</p>}
        {erro && <p>Erro ao carregar publicações.</p>}

        {/* 2. LISTA DE PUBLICAÇÕES */}
        <div className="page-content">
          {publicacoes.map((p) => (
            <ListaPublicacao key={p._id} {...p} />
          ))}
        </div>
      {/*/div */}
    </Container>
  );
}


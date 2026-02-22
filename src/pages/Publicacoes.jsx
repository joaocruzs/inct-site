import { useEffect, useState } from "react";
import Container from "../components/general/Container";
import PageTitle from "../components/general/PageTitle";
import FilterSidebar from "../components/general/FilterSidebar";
import ListaPublicacao from "../components/lists/ListaPublicacao";

import { getArtigos } from "../services/artigos.service";

export default function Publicacoes() {
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
      <PageTitle>Publicações</PageTitle>

      {loading && <p>Carregando publicações...</p>}
      {erro && <p>Erro ao carregar publicações.</p>}

      {/* 2. LISTA DE PUBLICAÇÕES */}
      <div className="page-content">
        {publicacoes.map((p) => (
          <ListaPublicacao key={p._id} {...p} />
        ))}
      </div>
    </Container>
  );
}


/*
    <Container>
      <PageTitle>Publicações</PageTitle>

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
*/


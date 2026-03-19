import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/general/Container";
import PageTitle from "../../components/general/PageTitle";
import { getCursosPublicados } from "../../services/cursos.service";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getCursosPublicados()
      .then(setCursos)
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <PageTitle>Cursos</PageTitle>

      {loading && <p>Carregando cursos...</p>}
      {erro    && <p>Erro ao carregar cursos.</p>}

      {!loading && !erro && cursos.length === 0 && (
        <p>Nenhum curso disponível no momento.</p>
      )}

      <div className="cursos-grid">
        {cursos.map((c) => (
          <Link key={c._id} to={`/cursos/${c._id}`} className="card-curso">
            {c.imagem && (
              <img src={c.imagem} alt={c.titulo} className="card-curso-img" />
            )}
            <div className="card-curso-info">
              <p className="card-curso-titulo">{c.titulo}</p>

              {c.tags.length > 0 && (
                <div className="card-curso-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="card-curso-tag">{t}</span>
                  ))}
                </div>
              )}

              <span className="card-curso-modulos">
                {c.modulos.length} módulo{c.modulos.length !== 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

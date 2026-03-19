import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/general/Container";
import VideoPlayer from "../../components/cursos/VideoPlayer";
import PdfViewer from "../../components/cursos/PdfViewer";
import Quiz from "../../components/cursos/Quiz";
import { getCursoById } from "../../services/cursos.service";

export default function CursoDetalhe() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abertos, setAbertos] = useState({});

  useEffect(() => {
    getCursoById(id)
      .then(setCurso)
      .finally(() => setLoading(false));
  }, [id]);

  function toggleModulo(idx) {
    setAbertos((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  if (loading) return <Container><p>Carregando curso...</p></Container>;
  if (!curso)  return <Container><p>Curso não encontrado.</p></Container>;

  return (
    <Container>
      <article className="curso-detalhe">

        {/* CABEÇALHO */}
        <div className="curso-detalhe-header">
          {curso.imagem && (
            <img
              src={curso.imagem}
              alt={curso.titulo}
              className="curso-detalhe-img"
            />
          )}

          <div className="curso-detalhe-info">
            <h1>{curso.titulo}</h1>

            {curso.tags.length > 0 && (
              <div className="curso-tags">
                {curso.tags.map((t) => (
                  <span key={t} className="curso-tag">{t}</span>
                ))}
              </div>
            )}

            {curso.descricao && <p>{curso.descricao}</p>}

            <p className="curso-meta">
              {curso.modulos.length} módulo{curso.modulos.length !== 1 ? "s" : ""}
              {curso.created_by_name && ` · por ${curso.created_by_name}`}
            </p>
          </div>
        </div>

        {/* MÓDULOS */}
        {curso.modulos.length === 0 ? (
          <p>Este curso ainda não possui módulos.</p>
        ) : (
          <div className="modulos-lista">
            {curso.modulos.map((modulo, idx) => (
              <div
                key={modulo.id}
                className={`modulo-item ${abertos[idx] ? "open" : ""}`}
              >
                <button
                  className="modulo-header"
                  onClick={() => toggleModulo(idx)}
                >
                  <span className="modulo-titulo">
                    {modulo.ordem}. {modulo.titulo}
                  </span>
                  <span className="modulo-icon">+</span>
                </button>

                {abertos[idx] && (
                  <div className="modulo-body">
                    {modulo.conteudos.map((c, cIdx) => (
                      <div key={cIdx}>
                        {c.tipo === "video" && <VideoPlayer url={c.url} />}

                        {c.tipo === "pdf" && (
                          <>
                            <p className="conteudo-pdf-label">Material em PDF</p>
                            <PdfViewer url={c.url} />
                          </>
                        )}

                        {c.tipo === "questoes" && c.questoes?.length > 0 && (
                          <>
                            <p className="conteudo-pdf-label">Questões</p>
                            <Quiz questoes={c.questoes} />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </article>
    </Container>
  );
}
